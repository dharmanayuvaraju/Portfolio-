// Supabase visitor counter utility
const metaEnv = (import.meta as any).env || {};
const SUPABASE_URL =
  (metaEnv.VITE_SUPABASE_URL as string) ||
  'https://gppcnpnaqapbsnnzegrs.supabase.co';

const SUPABASE_ANON_KEY =
  (metaEnv.VITE_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwcGNucG5hcWFwYnNubnplZ3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ5NjY3MzEsImV4cCI6MjExMDU0MjczMX0.1CuhO2ivlltNCPTjiUqlLUk5FZmpqFu2Ol7weIYHako';

export async function recordVisitorPageView(): Promise<void> {
  if (typeof window === 'undefined') return;

  const sessionKey = 'portfolio_session_viewed';
  if (sessionStorage.getItem(sessionKey)) {
    return; // Already recorded for this browser session
  }

  try {
    const payload = {
      path: window.location.pathname || '/',
      referrer: document.referrer || null,
      ua: navigator.userAgent || null,
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/page_views`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 201) {
      sessionStorage.setItem(sessionKey, 'true');
    }
  } catch (err) {
    // Fail silently so visitor experience is never interrupted
    console.warn('Could not record page view to Supabase:', err);
  }
}

export async function getVisitorCount(): Promise<number | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_page_views_count`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return typeof data === 'number' ? data : parseInt(data, 10);
    }
  } catch (err) {
    console.warn('Could not fetch visitor count from Supabase:', err);
  }
  return null;
}
