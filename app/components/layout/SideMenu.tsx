'use client';

import type { LucideIcon } from 'lucide-react';
import {
  Bookmark,
  ChevronLeft,
  ExternalLink,
  FileText,
  Hash,
  Home,
  LogIn,
  X,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { BRAND, ICON_STROKE } from '@/lib/constants';
import { buildUrl, routes } from '@/lib/routes';
import { useDrawer } from './DrawerProvider';

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
  variant?: 'accent';
  type?: 'route' | 'mailto' | 'external';
  search?: Record<string, string | number | boolean | undefined>;
  showActive?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    key: 'home',
    label: 'בית',
    href: routes.home,
    icon: Home,
  },
  {
    key: 'login',
    label: 'התחברות',
    href: routes.login,
    icon: LogIn,
    variant: 'accent',
  },
  {
    key: 'calculator',
    label: 'מחשבון קוד העושר',
    href: routes.calculator,
    icon: Hash,
  },
  {
    key: 'save-home',
    label: 'שמור למסך הבית',
    href: routes.home,
    search: { install: 1 },
    icon: Bookmark,
    showActive: false,
  },
  {
    key: 'terms',
    label: 'תנאים משפטיים',
    href: routes.terms,
    icon: FileText,
  },
  {
    key: 'contact',
    label: 'יצירת קשר',
    href: `mailto:${BRAND.email}`,
    icon: ExternalLink,
    type: 'mailto',
  },
];

function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href.startsWith('mailto:')) return false;
  if (href.startsWith('http')) return false;
  if (href === routes.home) {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

export function SideMenu() {
  const { open, railOpen, openDrawer, closeDrawer, closeRail, openRail } =
    useDrawer();
  const pathname = usePathname();
  const router = useRouter();

  const railNavItems = useMemo(
    () => [
      NAV_ITEMS[0], // home
      NAV_ITEMS[1], // login
      NAV_ITEMS[2], // calculator
      NAV_ITEMS[3], // save-home
    ],
    []
  );

  const handleCloseDrawer = useCallback(() => {
    closeDrawer();
    openRail();
  }, [closeDrawer, openRail]);

  const handleCloseAll = useCallback(() => {
    closeDrawer();
    closeRail();
  }, [closeDrawer, closeRail]);

  const handleNavigate = useCallback(
    (item: NavItem) => {
      if (item.type && item.type !== 'route') {
        if (typeof window !== 'undefined') {
          if (item.type === 'mailto') {
            window.location.href = item.href;
          } else {
            window.open(item.href, '_blank', 'noopener,noreferrer');
          }
        }
        handleCloseDrawer();
        return;
      }

      const targetUrl = item.search
        ? buildUrl(item.href, item.search)
        : item.href;

      router.push(targetUrl);
      handleCloseDrawer();
    },
    [router, handleCloseDrawer]
  );

  return (
    <>
      <div
        className="sideMenuBackdrop"
        data-open={open || railOpen ? 'true' : 'false'}
        role="presentation"
        onClick={handleCloseAll}
      />

      <aside className="sideMenuRail" data-open={railOpen ? 'true' : 'false'}>
        <div className="sideMenuRailSurface">
          <nav className="sideMenuRailNav" aria-label="תפריט מהיר">
            {railNavItems.map((item) => {
              const active =
                item.showActive === false
                  ? false
                  : isActivePath(pathname, item.href);
              return (
                <button
                  key={item.key}
                  type="button"
                  className="sideMenuRailAction"
                  data-active={active ? 'true' : undefined}
                  data-variant={item.variant}
                  onClick={() => handleNavigate(item)}
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  <item.icon
                    size={20}
                    strokeWidth={ICON_STROKE.default}
                    aria-hidden="true"
                    className="sideMenuRailIcon"
                  />
                </button>
              );
            })}
          </nav>

          <div className="sideMenuRailFooter">
            <button
              type="button"
              className="sideMenuRailExpand"
              onClick={() => {
                closeRail();
                openDrawer();
              }}
              aria-label="פתיחת תפריט מלא"
            >
              <ChevronLeft
                size={22}
                strokeWidth={ICON_STROKE.default}
                aria-hidden
              />
              <span className="sideMenuSrOnly">פתיחת תפריט מלא</span>
            </button>
          </div>
        </div>
      </aside>

      <aside
        className="sideMenuDrawer"
        data-open={open ? 'true' : 'false'}
        data-expanded={open ? 'true' : 'false'}
        role="dialog"
        aria-label="תפריט ניווט"
        aria-modal="true"
      >
        <div className="sideMenuContent">
          <div className="sideMenuCloseArea">
            <button
              type="button"
              className="sideMenuCloseButton"
              onClick={handleCloseDrawer}
              aria-label="סגירת תפריט"
            >
              <X size={20} strokeWidth={ICON_STROKE.default} aria-hidden />
            </button>

            <span className="sideMenuBrandTitle">{BRAND.name}</span>
          </div>

          <nav className="sideMenuNavList" aria-label="תפריט ראשי">
            {NAV_ITEMS.map((item) => {
              const active =
                item.showActive === false
                  ? false
                  : isActivePath(pathname, item.href);
              return (
                <button
                  key={item.key}
                  type="button"
                  className="sideMenuNavAction"
                  onClick={() => handleNavigate(item)}
                  aria-current={active ? 'page' : undefined}
                >
                  <span
                    className="sideMenuNavSurface"
                    data-active={active ? 'true' : undefined}
                    data-variant={item.variant}
                  >
                    <span className="sideMenuNavIcon" aria-hidden="true">
                      <item.icon size={22} strokeWidth={ICON_STROKE.default} />
                    </span>
                    <span className="sideMenuNavLabel">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default SideMenu;
