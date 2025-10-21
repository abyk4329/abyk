'use client';

import { useEffect } from 'react';

/**
 * Alt environment client: applies body scope and theme attribute based on localStorage.
 * Cleans up on unmount to avoid leaking classes/attrs when navigating away.
 */
export default function AltPageClient() {
  useEffect(() => {
    const body = document.body;
    try {
      body.classList.add('alt-scope');
      const pref =
        (typeof window !== 'undefined' &&
          window.localStorage.getItem('alt-theme-preference')) ||
        'light';
      body.setAttribute('data-alt-theme', pref);
    } catch {
      // no-op
    }

    return () => {
      body.classList.remove('alt-scope');
      body.removeAttribute('data-alt-theme');
    };
  }, []);

  return null;
}
