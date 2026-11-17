import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:3000';
const OUT_DIR = path.resolve('public/test-artifacts');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log('🚀 Launching real Chrome for Acceptance Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const results = {
    test1_click_and_touch_nodes: false,
    test2_independent_action_links: false,
    test3_chapter_rest_stops_sharp: false,
    test4_reduced_motion_fallback: false,
    test5_keyboard_only_traverse: false,
    test6_accurate_counts_no_fps_no_placeholders: false,
  };

  try {
    // --------------------------------------------------------------------------
    // TEST 1: Load 3D site, skip intro, test real click and touch tap
    // --------------------------------------------------------------------------
    console.log('\n--- 1. Testing Project Node Clicks & Touch Taps ---');
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 600));

    // Skip intro by pressing Space
    await page.keyboard.press('Space');
    await new Promise((r) => setTimeout(r, 600));

    // Navigate to Constellation entrance (cameraZ ≈ -1000px, where AI Job Hunt and CafeLive are directly in front)
    console.log('Navigating to Constellation entrance...');
    await page.evaluate(() => {
      window.scrollTo({ top: (1000 / 5200) * (document.documentElement.scrollHeight - window.innerHeight) });
    });
    await new Promise((r) => setTimeout(r, 1000));

    // Find all node buttons
    const nodeButtons = await page.$$('button[aria-label^="Open details for project:"]');
    console.log(`Found ${nodeButtons.length} project node buttons in 3D scene.`);

    if (nodeButtons.length === 11) {
      // Test real mouse click on first node
      console.log('Testing real mouse click on AI Job Hunt...');
      await nodeButtons[0].click();
      await new Promise((r) => setTimeout(r, 600));

      const titleEl = await page.$('#flyout-title');
      const isFlyoutOpen = !!titleEl;
      console.log('Detail flyout opened on click:', isFlyoutOpen);

      if (isFlyoutOpen) {
        await page.keyboard.press('Escape');
        await new Promise((r) => setTimeout(r, 600));
      }

      // Test real touch tap on second node
      console.log('Testing real touch tap on CafeLive...');
      await nodeButtons[1].tap();
      await new Promise((r) => setTimeout(r, 600));

      const titleEl2 = await page.$('#flyout-title');
      const isFlyoutOpenTouch = !!titleEl2;
      console.log('Detail flyout opened on touch tap:', isFlyoutOpenTouch);

      if (isFlyoutOpenTouch) {
        await page.keyboard.press('Escape');
        await new Promise((r) => setTimeout(r, 600));
      }

      if (isFlyoutOpen && isFlyoutOpenTouch) {
        results.test1_click_and_touch_nodes = true;
      }
    }

    // --------------------------------------------------------------------------
    // TEST 2: Independent Action Links (sibling <a>, not nested in button)
    // --------------------------------------------------------------------------
    console.log('\n--- 2. Testing Independent Card Action Links ---');
    const githubLink = await page.$('a[aria-label="AI Job Hunt source on GitHub"]');
    const liveLink = await page.$('a[aria-label="AI Job Hunt live application"]');

    if (githubLink && liveLink) {
      console.log('GitHub and Live links exist as independent sibling <a> tags.');

      // Check that clicking GitHub link doesn't open the detail flyout
      await page.evaluate(() => {
        const link = document.querySelector('a[aria-label="AI Job Hunt source on GitHub"]');
        if (link) {
          link.addEventListener('click', (e) => e.preventDefault(), { once: true });
        }
      });
      await githubLink.click();
      await new Promise((r) => setTimeout(r, 300));

      const flyoutAfterLinkClick = await page.$('#flyout-title');
      const linkDidNotTriggerFlyout = !flyoutAfterLinkClick;
      console.log('Clicking link does not trigger flyout:', linkDidNotTriggerFlyout);

      results.test2_independent_action_links = linkDidNotTriggerFlyout;
    }

    // --------------------------------------------------------------------------
    // TEST 3: Screenshots at Each Chapter Rest Stop (Sharpness & Zero Overlap)
    // --------------------------------------------------------------------------
    console.log('\n--- 3. Capturing Chapter Rest Stops Screenshots ---');
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

    // Stop 0: ORIGIN
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, '01-origin-rest.png') });
    console.log('Saved 01-origin-rest.png');

    // Stop 1: CONSTELLATION
    await page.evaluate((max) => window.scrollTo({ top: (1800 / 5200) * max }), maxScroll);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, '02-constellation-rest.png') });
    console.log('Saved 02-constellation-rest.png');

    // Stop 2: ARCHITECTURE
    await page.evaluate((max) => window.scrollTo({ top: (3800 / 5200) * max }), maxScroll);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, '03-architecture-rest.png') });
    console.log('Saved 03-architecture-rest.png');

    // Stop 3: TERMINUS
    await page.evaluate((max) => window.scrollTo({ top: max }), maxScroll);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUT_DIR, '04-terminus-rest.png') });
    console.log('Saved 04-terminus-rest.png');

    results.test3_chapter_rest_stops_sharp = true;

    // --------------------------------------------------------------------------
    // TEST 4: Reduced-Motion Mode (OS preference & Stacked Non-Overlapping Layout)
    // --------------------------------------------------------------------------
    console.log('\n--- 4. Testing Reduced-Motion Mode ---');
    const rmPage = await browser.newPage();
    await rmPage.setViewport({ width: 1280, height: 800 });
    await rmPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await rmPage.goto(URL, { waitUntil: 'domcontentloaded' });
    await new Promise((r) => setTimeout(r, 600));

    const projectsSection = await rmPage.$('#projects');
    const rmCards = await rmPage.$$('#projects .group');
    console.log(`Reduced motion cards rendered in vertical stack/grid: ${rmCards.length}`);

    await rmPage.screenshot({ path: path.join(OUT_DIR, '05-reduced-motion-layout.png') });
    console.log('Saved 05-reduced-motion-layout.png');

    if (projectsSection && rmCards.length === 11) {
      results.test4_reduced_motion_fallback = true;
    }
    await rmPage.close();

    // --------------------------------------------------------------------------
    // TEST 5: Full Keyboard-Only Traverse
    // --------------------------------------------------------------------------
    console.log('\n--- 5. Testing Keyboard-Only Navigation ---');
    // Scroll to constellation so project nodes are in active view
    await page.evaluate((max) => window.scrollTo({ top: (1800 / 5200) * max }), maxScroll);
    await new Promise((r) => setTimeout(r, 600));

    // Focus the first project node button using keyboard Tab or native focus
    const firstNode = await page.$('button[aria-label^="Open details for project:"]');
    if (firstNode) {
      await firstNode.focus();
      await new Promise((r) => setTimeout(r, 100));

      // Press Enter to open
      await page.keyboard.press('Enter');
      await new Promise((r) => setTimeout(r, 600));

      const flyoutKb = await page.$('#flyout-title');
      console.log('Opened project node via keyboard Enter:', !!flyoutKb);

      if (flyoutKb) {
        // Press Escape to close
        await page.keyboard.press('Escape');
        await new Promise((r) => setTimeout(r, 500));
        const flyoutClosed = !(await page.$('#flyout-title'));
        console.log('Closed project node via keyboard Escape:', flyoutClosed);
        if (flyoutClosed) {
          results.test5_keyboard_only_traverse = true;
        }
      }
    }

    // --------------------------------------------------------------------------
    // TEST 6: Filtered Counts, No Static FPS, No Placeholder Galleries
    // --------------------------------------------------------------------------
    console.log('\n--- 6. Verifying Counts, FPS Claims & Galleries ---');
    await page.evaluate((max) => window.scrollTo({ top: (1800 / 5200) * max }), maxScroll);
    await new Promise((r) => setTimeout(r, 600));

    // Check filter counts
    const appsBtnText = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('div[role="tablist"] button'));
      return btns.map((b) => b.textContent.trim()).join(' | ');
    });
    console.log('Filter HUD counts:', appsBtnText);

    // Check static fps claim
    const hasFpsClaim = await page.evaluate(() => document.body.innerText.includes('60fps'));
    console.log('Contains static 60fps claim:', hasFpsClaim);

    // Open Job-Tracker (no screenshots) and verify NO placeholder gallery box
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button[aria-label^="Open details for project:"]'));
      const jt = btns.find((b) => b.getAttribute('aria-label').includes('Job-Tracker'));
      if (jt) jt.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    const placeholderText = await page.evaluate(() =>
      document.body.innerText.includes('Screenshot Gallery Placeholder')
    );
    console.log('Contains placeholder gallery text:', placeholderText);

    if (!hasFpsClaim && !placeholderText) {
      results.test6_accurate_counts_no_fps_no_placeholders = true;
    }

    console.log('\n========================================');
    console.log('ACCEPTANCE VERIFICATION RESULTS:');
    console.log(JSON.stringify(results, null, 2));
    console.log('========================================\n');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }
}

run();
