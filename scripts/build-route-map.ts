import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, sep } from 'path';

const APP_DIR = join(process.cwd(), 'src', 'app');

function walk(dir: string, acc: string[] = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function toRoute(file: string) {
  const rel = file.split(`${sep}app${sep}`)[1];
  if (!rel) return null;
  const parts = rel.split(sep)
    .map(p => (p.startsWith('(') && p.endsWith(')') ? '' : p))
    .filter(Boolean);
  const last = parts[parts.length - 1];
  if (last === 'page.tsx' || last === 'page.ts') {
    const path = '/' + parts.slice(0, -1).join('/');
    return path === '//' ? '/' : path;
  }
  if (last === 'route.ts' || last === 'route.tsx') {
    const path = '/api/' + parts.slice(0, -1).join('/').replace(/^api\//,'');
    return path;
  }
  return null;
}

const files = walk(APP_DIR);
const routeMap: Record<string,string> = {};
for (const f of files) {
  const route = toRoute(f);
  if (route) routeMap[route] = f.replace(process.cwd()+sep,'');
}
writeFileSync(join(process.cwd(), 'src', 'routeMap.json'), JSON.stringify(routeMap, null, 2));
console.log('routeMap.json generated with', Object.keys(routeMap).length, 'routes');
