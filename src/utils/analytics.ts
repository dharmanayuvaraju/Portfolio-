// Google Analytics 4 integration
const metaEnv = (import.meta as any).env || {};
const GA_ID =
  (metaEnv.VITE_GA_ID as string) ||
  (metaEnv.NEXT_PUBLIC_GA_ID as string) ||
  '';

let gaInitialized = false;

export function initGA() {
  if (typeof window === 'undefined' || gaInitialized || !GA_ID) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  const inlineScript = document.createElement('script');
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { send_page_view: false });
  `;
  document.head.appendChild(inlineScript);

  gaInitialized = true;
}

export function trackPageView(chapterName: string) {
  if (typeof window === 'undefined') return;

  // Ensure GA is initialized if ID is present
  if (!gaInitialized && GA_ID) {
    initGA();
  }

  const w = window as any;
  if (typeof w.gtag === 'function' && GA_ID) {
    w.gtag('event', 'page_view', {
      page_title: chapterName,
      page_path: `/${chapterName.toLowerCase()}`,
    });
  }
}
