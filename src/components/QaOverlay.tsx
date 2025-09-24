'use client';
import { useEffect, useState } from 'react';

export default function QaOverlay({ routeMap }: { routeMap: Record<string,string> }) {
  const [show, setShow] = useState(false);
  const [links, setLinks] = useState<{text:string, href:string}[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setShow(params.get('qa') === '1');

    const as = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[];
    setLinks(as.map(a => ({ text: a.innerText.trim() || '(no text)', href: a.getAttribute('href') || '' })));

    const onClick = (e: Event) => {
      const el = e.target as HTMLElement;
      const link = el.closest('a[href]') as HTMLAnchorElement | null;
      if (link && params.get('qa') === '1') console.log('[QA] click →', link.href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!show) return null;
  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div style={{
      position:'fixed', bottom:10, right:10, zIndex:99999,
      background:'rgba(0,0,0,.85)', color:'#fff', padding:12, maxWidth:380,
      fontFamily:'monospace', fontSize:12, border:'1px solid #555', borderRadius:8
    }}>
      <div><b>Path:</b> {path}</div>
      <div><b>Source file:</b> {routeMap[path] || '(unknown)'}</div>
      <div style={{marginTop:8}}><b>Links on page:</b></div>
      <ul style={{maxHeight:160, overflow:'auto', margin:0, paddingLeft:16}}>
        {links.map((l,i)=> <li key={i}><code>{l.text}</code> → <span>{l.href}</span></li>)}
      </ul>
      <div style={{marginTop:8, opacity:.8}}>
        Tip: הוסיפי <code>?qa=1</code> לכתובת כדי לראות לוגים בזמן לחיצה.
      </div>
    </div>
  );
}
