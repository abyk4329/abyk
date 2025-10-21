'use client';

import { ChevronsDown, Lightbulb } from 'lucide-react';
import { useCallback } from 'react';

import { ICON_STROKE } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { IconButton } from '@/components/neu';
import { useDrawer } from './DrawerProvider';
import { useThemePreference } from './useThemePreference';

export function HeaderBar() {
  const { open, railOpen, openRail, closeRail } = useDrawer();
  const drawerOpen = open;
  const anyMenuOpen = open || railOpen;
  const { mode: themeMode, toggleTheme } = useThemePreference();

  const quickLabel = 'פתיחת תפריט מהיר';
  const themeLabel = themeMode === 'dark' ? 'מעבר למצב בהיר' : 'מעבר למצב כהה';

  const handleToggleRail = useCallback(() => {
    if (railOpen) {
      closeRail();
      return;
    }

    openRail();
  }, [railOpen, closeRail, openRail]);

  return (
    <header
      className="appHeaderBar"
      role="banner"
      data-hidden={anyMenuOpen}
      data-cookie-element="header"
    >
      <div
        className={cn(
          'appHeaderInner',
          'appHeaderOnlyControls',
          'header-only-controls'
        )}
      >
        <IconButton
          aria-label={quickLabel}
          title={quickLabel}
          onClick={handleToggleRail}
          size="md"
          className={cn('appHeaderTrigger', 'appHeaderCircle', 'rail-trigger')}
          data-rail-trigger="true"
          data-hidden={anyMenuOpen}
          aria-haspopup="dialog"
          aria-expanded={railOpen}
        >
          <ChevronsDown
            strokeWidth={ICON_STROKE.default}
            className="h-7 w-7"
            aria-hidden="true"
          />
        </IconButton>

        <IconButton
          aria-label={themeLabel}
          title={themeLabel}
          onClick={toggleTheme}
          size="md"
          className={cn('appHeaderTrigger', 'appHeaderCircle', 'theme-trigger')}
          data-hidden={anyMenuOpen}
          aria-pressed={themeMode === 'dark'}
        >
          <Lightbulb
            strokeWidth={ICON_STROKE.default}
            className="h-6 w-6"
            aria-hidden="true"
          />
        </IconButton>
      </div>
    </header>
  );
}
