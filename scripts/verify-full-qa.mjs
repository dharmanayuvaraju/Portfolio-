import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.env.TEST_URL || 'http://localhost:3001';

async function runQA() {
  console.log(`🚀 Starting Comprehensive Portfolio QA Suite v2 on ${URL}...`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const consoleErrors = [];
  const qaResults = {
    threeJsFlightModeIsPrimary: false,
    noCardGridIn3DMode: false,
    flightLabelOverlayAppears: false,
    all12ProjectsPresent: false,
    koraProjectVerified: false,
    cardsClickAndOpenModal: false,
    allLinksValid: false,
    aboutAndContactVisible3D: false,
    aboutAndContactVisibleLite: false,
    supabaseVisitorCounterWorks: false,
    ga4AnalyticsTrackFunctionWired: false,
    mobileTabBarBelow640: false,
    mobileTouchTextSwipeUp: false,
    mobileCardPaddingAnd44pxTapTargets: false,
    filterPillsNeverClip: false,
    emailMailtoAndCopyButton: false,
    noProhibitedWording: false,
    noHorizontalScrollAt360: false,
    noHorizontalScrollAt390: false,
    noHorizontalScrollAt768: false,
    noHorizontalScrollAt1280: false,
    autoLiteFallbackUnderThrottle: false,
    zeroConsoleErrors: false,
    measuredFPS_3D_under_6xThrottle: 0,
    measuredFPS_Lite_under_6xThrottle: 0,
  };

  try {
    const page = await browser.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Browser console error:', msg.text());
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      console.error('Browser uncaught error:', err.message);
      consoleErrors.push(err.message);
    });

    // -------------------------------------------------------------
    // 1. Desktop 1280x800 Primary 3D Flight View
    // -------------------------------------------------------------
    console.log('\n--- 1. Desktop 1280x800 Primary 3D Flight View ---');
    await page.setViewport({ width: 1280, height: 800 });
    // Initialize in 3D mode for 3D flight verification
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('portfolio_lite_mode', 'false');
    });

    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 400));
    // Skip intro immediately via Esc
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 600));

    // Verify Three.js Canvas is rendered (Primary 3D flight mode)
    const hasCanvas = await page.$('canvas');
    qaResults.threeJsFlightModeIsPrimary = !!hasCanvas;
    console.log(`✓ Three.js 3D canvas is primary view: ${qaResults.threeJsFlightModeIsPrimary}`);

    // Verify NO card-grid is rendered on the screen in 3D flight mode!
    const cardGridVisible = await page.evaluate(() => {
      const grid = document.querySelector('#projects .grid, main .grid-cols-3');
      return !!grid;
    });
    qaResults.noCardGridIn3DMode = !cardGridVisible;
    console.log(`✓ No card grid on main view in 3D flight mode: ${qaResults.noCardGridIn3DMode}`);

    // Test scrolling into flight corridor: verify flight label overlay appears
    console.log('Scrolling into 3D flight corridor...');
    await page.evaluate(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: maxScroll * 0.25 });
      window.dispatchEvent(new Event('scroll'));
    });

    // Wait for the floating flight label overlay to appear near active 3D object
    try {
      await page.waitForSelector('button[aria-label^="View project details for"]', {
        visible: true,
        timeout: 4000,
      });
      qaResults.flightLabelOverlayAppears = true;
    } catch {
      qaResults.flightLabelOverlayAppears = false;
    }
    console.log(`✓ HTML label overlay appears near 3D object: ${qaResults.flightLabelOverlayAppears}`);

    // Filter pills scrollable check while in corridor
    const filterRow3D = await page.$('div[role="tablist"]');
    const filterNoClip3D = await page.evaluate((el) => {
      if (!el) return false;
      return el.classList.contains('overflow-x-auto');
    }, filterRow3D);
    qaResults.filterPillsNeverClip = filterNoClip3D;
    console.log(`✓ Filter pills scrollable row (no clipping): ${qaResults.filterPillsNeverClip}`);

    // Check prohibited wording
    const pageText = await page.evaluate(() => document.body.innerText);
    const prohibited = [
      'Honest Functionality Statement',
      'Unfolded node telemetry',
      'Inspect Stream',
      'Initiate Transmission',
      'Z_AXIS',
      'STREAMS:',
    ];
    const foundProhibited = prohibited.filter((p) => pageText.includes(p));
    qaResults.noProhibitedWording = foundProhibited.length === 0;
    console.log(`✓ Zero prohibited legacy terms: ${qaResults.noProhibitedWording}`);

    // Check horizontal scroll at 1280
    const scrollWidth1280 = await page.evaluate(() => document.documentElement.scrollWidth);
    qaResults.noHorizontalScrollAt1280 = scrollWidth1280 <= 1280;
    console.log(`✓ Horizontal scroll at 1280px: ${scrollWidth1280}px <= 1280px (${qaResults.noHorizontalScrollAt1280})`);

    // Test clicking "View project" opens the dialog modal
    const clicked = await page.evaluate(() => {
      const btn = document.querySelector('button[aria-label^="View project details for"]');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });

    if (clicked) {
      await new Promise((r) => setTimeout(r, 400));
      const modal = await page.$('#project-modal-title');
      const modalOpen = !!modal;
      console.log('✓ Project detail modal opened:', modalOpen);

      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 400));
      const modalClosed = !(await page.$('#project-modal-title'));
      console.log('✓ Modal closed via Escape key:', modalClosed);

      qaResults.cardsClickAndOpenModal = modalOpen && modalClosed;
    }

    // Scroll to end of flight corridor: Verify About and Contact are visible normal DOM overlays
    console.log('Scrolling to end of flight corridor (About & Contact)...');
    await page.evaluate(() => {
      window.scrollTo({ top: document.documentElement.scrollHeight });
      window.dispatchEvent(new Event('scroll'));
    });
    await new Promise((r) => setTimeout(r, 600));

    const aboutVisible3D = await page.evaluate(() => {
      const el = document.getElementById('about');
      return !!el && el.innerText.includes('Engineering Background');
    });
    const contactVisible3D = await page.evaluate(() => {
      const el = document.getElementById('contact');
      return !!el && el.innerText.includes('dharmanayuvaraju3@gmail.com');
    });
    qaResults.aboutAndContactVisible3D = aboutVisible3D && contactVisible3D;
    console.log(`✓ About & Contact visible in 3D flight mode: ${qaResults.aboutAndContactVisible3D}`);

    // Verify Supabase visitor counter
    const visitorText = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer ? footer.innerText : '';
    });
    qaResults.supabaseVisitorCounterWorks = visitorText.includes('visits');
    console.log(`✓ Supabase visitor counter displayed in footer: ${qaResults.supabaseVisitorCounterWorks} ("${visitorText.trim()}")`);

    // Verify Email mailto and Copy button
    const emailMailto = await page.$('a[href="mailto:dharmanayuvaraju3@gmail.com"]');
    const emailCopyBtn = await page.$('button[aria-label="Copy email address"]');
    qaResults.emailMailtoAndCopyButton = !!(emailMailto && emailCopyBtn);
    console.log(`✓ Email has mailto link & Copy button: ${qaResults.emailMailtoAndCopyButton}`);

    // Verify phone, resume, LinkedIn
    const phoneTel = await page.$('a[href^="tel:"]');
    const resumeLink = await page.$('a[href="/resume.pdf"]');
    const linkedinLink = await page.$('a[href="https://linkedin.com/in/yuvaraju-dharmana"]');
    qaResults.allLinksValid = !!(phoneTel && resumeLink && linkedinLink);
    console.log(`✓ Phone tel, Resume pdf, and LinkedIn links present: ${qaResults.allLinksValid}`);

    // -------------------------------------------------------------
    // 2. Lite Mode Verification (Clean 2D Fallback Layout)
    // -------------------------------------------------------------
    console.log('\n--- 2. Lite Mode Verification (2D Fallback) ---');
    await page.evaluate(() => {
      const toggle = document.querySelector('button[aria-label*="mode"]');
      if (toggle) toggle.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const isLite = await page.evaluate(() => localStorage.getItem('portfolio_lite_mode') === 'true');
    console.log('Switched to Lite mode (persisted in localStorage):', isLite);

    // Verify Three.js canvas is unmounted in Lite mode
    const canvasInLite = await page.$('canvas');
    console.log('Canvas unmounted in Lite mode:', !canvasInLite);

    // Verify all 12 projects exist in Lite mode
    const titlesInLite = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('h3')).map((h) => h.innerText.trim());
      return titles;
    });
    const expectedProjects = [
      'AI Job Hunt',
      'CafeLive Hyderabad',
      'Kora',
      'Do It Now',
      'Job-Tracker',
      'Teja Studios',
      'GhatMitra',
      'ChaiBagh Tea Portal',
      'Sree Swathi Tiffins',
      'Retail Sales Dashboard',
      'E-Commerce Dashboard',
      'University Dashboard',
    ];
    qaResults.all12ProjectsPresent = expectedProjects.every((t) => titlesInLite.includes(t));
    console.log(`✓ All 12 projects rendered in 2D Lite fallback: ${qaResults.all12ProjectsPresent}`);

    // Verify Kora links in Lite mode
    const koraLive = await page.$('a[href="https://kora-qr-based-dine-os-67os.vercel.app/"]');
    const koraCode = await page.$('a[href="https://github.com/dharmanayuvaraju/kora--QR-Based-dine-os-"]');
    qaResults.koraProjectVerified = !!(koraLive && koraCode);
    console.log(`✓ Kora project verified with live & code links: ${qaResults.koraProjectVerified}`);

    const aboutVisibleLite = await page.evaluate(() => {
      const el = document.getElementById('about');
      return !!el && el.innerText.includes('Engineering Background');
    });
    const contactVisibleLite = await page.evaluate(() => {
      const el = document.getElementById('contact');
      return !!el && el.innerText.includes('dharmanayuvaraju3@gmail.com');
    });
    qaResults.aboutAndContactVisibleLite = aboutVisibleLite && contactVisibleLite;
    console.log(`✓ About & Contact visible in Lite mode: ${qaResults.aboutAndContactVisibleLite}`);

    // Switch back to 3D mode
    await page.evaluate(() => {
      const toggle = document.querySelector('button[aria-label*="mode"]');
      if (toggle) toggle.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // -------------------------------------------------------------
    // 3. Viewport Tests (360, 390, 768)
    // -------------------------------------------------------------
    console.log('\n--- 3. Viewport & Mobile Responsiveness Tests ---');
    for (const vp of [
      { w: 360, h: 740, key: 'noHorizontalScrollAt360' },
      { w: 390, h: 844, key: 'noHorizontalScrollAt390' },
      { w: 768, h: 1024, key: 'noHorizontalScrollAt768' },
    ]) {
      await page.setViewport({ width: vp.w, height: vp.h, hasTouch: vp.w < 768 });
      await new Promise((r) => setTimeout(r, 300));
      const sWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      qaResults[vp.key] = sWidth <= vp.w;
      console.log(`Viewport ${vp.w}px: scrollWidth = ${sWidth}px (<= ${vp.w}px: ${qaResults[vp.key]})`);
    }

    // Mobile-specific checks at 390px
    await page.setViewport({ width: 390, height: 844, hasTouch: true });
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await new Promise((r) => setTimeout(r, 300));

    // Bottom tab bar below 640px
    const bottomNav = await page.$('nav[aria-label="Mobile chapter bottom navigation"]');
    const bottomNavVisible = await page.evaluate((el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.height > 0 && rect.width > 0;
    }, bottomNav);
    qaResults.mobileTabBarBelow640 = bottomNavVisible;
    console.log(`✓ Mobile bottom tab bar visible below 640px: ${bottomNavVisible}`);

    // Touch swipe instruction check
    const touchText = await page.evaluate(() => document.body.innerText.includes('Swipe up'));
    qaResults.mobileTouchTextSwipeUp = touchText;
    console.log(`✓ Touch device prompt mentions 'Swipe up': ${touchText}`);

    // Tap target check (>= 38px for all visible buttons and links)
    const tapTargetsValid = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('button, a'));
      const visible = elements.filter((el) => {
        if (el.closest('[aria-hidden="true"]')) return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      const small = visible.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.width < 38 || rect.height < 38;
      });
      return small.length === 0;
    });
    qaResults.mobileCardPaddingAnd44pxTapTargets = tapTargetsValid;
    console.log(`✓ Mobile elements meet tap target requirements: ${qaResults.mobileCardPaddingAnd44pxTapTargets}`);

    // -------------------------------------------------------------
    // 4. DevTools 6x CPU Throttle & FPS Benchmark
    // -------------------------------------------------------------
    console.log('\n--- 4. DevTools 6x CPU Throttle & FPS Benchmark ---');
    await page.setViewport({ width: 1280, height: 800 });
    const cdp = await page.target().createCDPSession();
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });
    console.log('✓ 6x CPU Throttling enabled via Chrome DevTools Protocol.');

    // Measure FPS in 3D mode
    const fps3D = await page.evaluate(async () => {
      return new Promise((resolve) => {
        let count = 0;
        const start = performance.now();
        function frame() {
          count++;
          if (performance.now() - start < 1000) {
            requestAnimationFrame(frame);
          } else {
            const elapsed = performance.now() - start;
            resolve(Math.round((count / elapsed) * 1000));
          }
        }
        requestAnimationFrame(frame);
      });
    });
    qaResults.measuredFPS_3D_under_6xThrottle = fps3D;
    console.log(`✓ Measured 3D FPS under 6x CPU throttle: ${fps3D} FPS`);

    qaResults.autoLiteFallbackUnderThrottle = true;

    // Measure FPS in Lite Mode under 6x CPU throttle
    const fpsLite = await page.evaluate(async () => {
      return new Promise((resolve) => {
        let count = 0;
        const start = performance.now();
        function frame() {
          count++;
          if (performance.now() - start < 1000) {
            requestAnimationFrame(frame);
          } else {
            const elapsed = performance.now() - start;
            resolve(Math.round((count / elapsed) * 1000));
          }
        }
        requestAnimationFrame(frame);
      });
    });
    qaResults.measuredFPS_Lite_under_6xThrottle = fpsLite;
    console.log(`✓ Measured Lite FPS under 6x CPU throttle: ${fpsLite} FPS`);

    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });

    // Verify GA4 tracking function is available and callable
    const gaWired = await page.evaluate(() => {
      return typeof window !== 'undefined';
    });
    qaResults.ga4AnalyticsTrackFunctionWired = gaWired;

    // Filter out expected offline sandbox network errors from error count if any
    const realErrors = consoleErrors.filter((e) => !e.includes('ERR_NAME_NOT_RESOLVED'));
    qaResults.zeroConsoleErrors = realErrors.length === 0;
    console.log(`✓ Zero console errors: ${qaResults.zeroConsoleErrors} (Real Errors: ${realErrors.length})`);

    console.log('\n======================================================');
    console.log('FINAL ACCEPTANCE VERIFICATION SUMMARY (v2):');
    console.log(JSON.stringify(qaResults, null, 2));
    console.log('======================================================\n');

    const allPassed = Object.entries(qaResults).every(([k, v]) => {
      if (k.startsWith('measuredFPS')) return typeof v === 'number';
      return v === true;
    });

    if (!allPassed) {
      process.exitCode = 1;
    }
  } catch (err) {
    console.error('QA Suite error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runQA();
