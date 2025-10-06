"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassButton } from "@/app/components/shared/GlassButton";
import { routes } from "@/lib/routes";

import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cookieConsent:v2";
const LEGACY_KEY = "abyk-cookie-consent";
const CONSENT_VERSION = 2;

export type ConsentCategory =
  | "essential"
  | "statistics"
  | "marketing"
  | "personalization";
export type NonEssentialCategory = Exclude<ConsentCategory, "essential">;

type ConsentStatus = "pending" | "granted" | "denied" | "custom";

type ConsentCategories = Record<ConsentCategory, boolean>;

interface ConsentPreferences {
  version: number;
  status: ConsentStatus;
  categories: ConsentCategories;
  updatedAt: string;
}

interface CookieConsentContextValue {
  preferences: ConsentPreferences;
  isBannerVisible: boolean;
  isSettingsOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  saveSettings: (categories: ConsentCategories) => void;
}

const focusableSelectors = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const defaultPreferences: ConsentPreferences = {
  version: CONSENT_VERSION,
  status: "pending",
  categories: {
    essential: true,
    statistics: false,
    marketing: false,
    personalization: false,
  },
  updatedAt: new Date(0).toISOString(),
};

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(
  undefined,
);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

function ensureEssentialTrue(categories: Partial<ConsentCategories> | undefined) {
  return {
    essential: true,
    statistics: Boolean(categories?.statistics),
    marketing: Boolean(categories?.marketing),
    personalization: Boolean(categories?.personalization),
  } as ConsentCategories;
}

function computeStatus(categories: ConsentCategories): ConsentStatus {
  const flags = [categories.statistics, categories.marketing, categories.personalization];
  if (flags.every(Boolean)) {
    return "granted";
  }
  if (flags.every((flag) => !flag)) {
    return "denied";
  }
  return "custom";
}

function normalizePreferences(
  preferences: Partial<ConsentPreferences> | null,
): ConsentPreferences {
  if (!preferences) {
    return { ...defaultPreferences };
  }

  const categories = ensureEssentialTrue(preferences.categories);
  const status =
    preferences.status === "pending"
      ? "pending"
      : computeStatus(categories);

  return {
    version: CONSENT_VERSION,
    status,
    categories,
    updatedAt: preferences.updatedAt ?? new Date().toISOString(),
  };
}

function migrateLegacyConsent(value: string | null): ConsentPreferences | null {
  if (!value) {
    return null;
  }

  if (value === "accepted") {
    return {
      version: CONSENT_VERSION,
      status: "granted",
      categories: {
        essential: true,
        statistics: true,
        marketing: true,
        personalization: true,
      },
      updatedAt: new Date().toISOString(),
    };
  }

  if (value === "dismissed") {
    return {
      version: CONSENT_VERSION,
      status: "denied",
      categories: {
        essential: true,
        statistics: false,
        marketing: false,
        personalization: false,
      },
      updatedAt: new Date().toISOString(),
    };
  }

  return null;
}

function loadPreferencesFromStorage(): ConsentPreferences {
  if (typeof window === "undefined") {
    return { ...defaultPreferences };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ConsentPreferences> | null;
      if (parsed && parsed.version === CONSENT_VERSION) {
        return normalizePreferences(parsed);
      }
    }
  } catch (error) {
    console.warn("CookieConsent: Failed to parse stored preferences", error);
  }

  try {
    const legacyRaw = window.localStorage.getItem(LEGACY_KEY);
    if (legacyRaw) {
      const migrated = migrateLegacyConsent(legacyRaw);
      window.localStorage.removeItem(LEGACY_KEY);
      if (migrated) {
        persistPreferences(migrated);
        return migrated;
      }
    }
  } catch (error) {
    console.warn("CookieConsent: Failed to read legacy preferences", error);
  }

  return { ...defaultPreferences };
}

function persistPreferences(preferences: ConsentPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload = JSON.stringify({
      ...preferences,
      updatedAt: new Date().toISOString(),
    });
    window.localStorage.setItem(STORAGE_KEY, payload);
  } catch (error) {
    console.warn("CookieConsent: Failed to persist preferences", error);
  }
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    ...defaultPreferences,
  });
  const [isBannerVisible, setBannerVisible] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const wasBannerVisibleRef = useRef(false);

  useEffect(() => {
    const stored = loadPreferencesFromStorage();
    setPreferences(stored);
    setBannerVisible(stored.status === "pending");
  }, []);

  const updatePreferences = useCallback(
    (next: ConsentPreferences, options?: { hideBanner?: boolean }) => {
      const normalized = normalizePreferences(next);
      setPreferences(normalized);
      persistPreferences(normalized);
      if (options?.hideBanner ?? true) {
        setBannerVisible(false);
        wasBannerVisibleRef.current = false;
      }
    },
    [],
  );

  const acceptAll = useCallback(() => {
    updatePreferences(
      {
        version: CONSENT_VERSION,
        status: "granted",
        categories: {
          essential: true,
          statistics: true,
          marketing: true,
          personalization: true,
        },
        updatedAt: new Date().toISOString(),
      },
      { hideBanner: true },
    );
    setSettingsOpen(false);
  }, [updatePreferences]);

  const rejectAll = useCallback(() => {
    updatePreferences(
      {
        version: CONSENT_VERSION,
        status: "denied",
        categories: {
          essential: true,
          statistics: false,
          marketing: false,
          personalization: false,
        },
        updatedAt: new Date().toISOString(),
      },
      { hideBanner: true },
    );
    setSettingsOpen(false);
  }, [updatePreferences]);

  const openSettings = useCallback(() => {
    wasBannerVisibleRef.current = isBannerVisible || preferences.status === "pending";
    setSettingsOpen(true);
    setBannerVisible(false);
  }, [isBannerVisible, preferences.status]);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    if (preferences.status === "pending" || wasBannerVisibleRef.current) {
      setBannerVisible(true);
    }
  }, [preferences.status]);

  const saveSettings = useCallback(
    (categories: ConsentCategories) => {
      const normalizedCategories = ensureEssentialTrue(categories);
      const status = computeStatus(normalizedCategories);
      updatePreferences(
        {
          version: CONSENT_VERSION,
          status,
          categories: normalizedCategories,
          updatedAt: new Date().toISOString(),
        },
        { hideBanner: true },
      );
      setSettingsOpen(false);
    },
    [updatePreferences],
  );

  const contextValue = useMemo(
    () => ({
      preferences,
      isBannerVisible,
      isSettingsOpen,
      acceptAll,
      rejectAll,
      openSettings,
      closeSettings,
      saveSettings,
    }),
    [
      preferences,
      isBannerVisible,
      isSettingsOpen,
      acceptAll,
      rejectAll,
      openSettings,
      closeSettings,
      saveSettings,
    ],
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
      <ConsentBanner />
      <CookieSettingsModal />
    </CookieConsentContext.Provider>
  );
}

interface ConsentBannerButtonProps {
  onClick: () => void;
  children: ReactNode;
}

function SecondaryButton({ onClick, children }: ConsentBannerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.ghostButton}
    >
      {children}
    </button>
  );
}

function LinkButton({ onClick, children }: ConsentBannerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.linkButton}
    >
      {children}
    </button>
  );
}

function ConsentBanner() {
  const { isBannerVisible, acceptAll, rejectAll, openSettings } = useCookieConsent();
  const pathname = usePathname();
  const isHomeRoute = pathname === routes.home;

  if (!isBannerVisible) {
    return null;
  }

  return (
    <div
      className={[
        "fixed inset-x-0 z-[70] flex justify-center px-4 sm:px-6",
        isHomeRoute ? "bottom-0" : "bottom-4",
        styles.outer,
        isHomeRoute ? styles.homeOverlay : styles.standardOverlay,
      ].join(" ")}
      aria-live="polite"
    >
      <div
        className={["w-full max-w-3xl rounded-[28px] border-0 px-6 py-5 text-center text-sm sm:text-base", styles.card].join(" ")}
      >
        <h2 className={["mb-3 text-base font-semibold sm:text-lg", styles.title].join(" ")}>
          אנחנו משתמשים בקובצי קוקיז באתר
        </h2>
        <p className="mx-auto mb-4 max-w-2xl text-xs leading-snug text-[#473b31] sm:text-sm">
          כדי לשפר את חוויית השימוש באתר, אנחנו נעזרים בקובצי קוקיז לאיסוף מידע סטטיסטי, להתאמת תוכן אישי ולמדידת ביצועים (כולל TikTok Pixel). בלחיצה על &quot;מאשר/ת&quot; אתם מסכימים לשימוש בקוקיז בהתאם למדיניות הפרטיות ותנאי השימוש. המידע שנאסף אינו מועבר לגורמים חיצוניים ומשמש לשיפור מתמשך בלבד.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GlassButton onClick={acceptAll} className="w-full sm:w-auto">
            מאשר/ת
          </GlassButton>
          <SecondaryButton onClick={rejectAll}>לא מאשר/ת</SecondaryButton>
          <LinkButton onClick={openSettings}>ניהול הגדרות</LinkButton>
        </div>
        <div className="mt-3 text-xs text-[#9f8572]">
          <Link href="/terms" className="underline underline-offset-2">
            קראו את תנאי השימוש ומדיניות הפרטיות
          </Link>
        </div>
      </div>
    </div>
  );
}

const CATEGORY_CONTENT: Record<NonEssentialCategory, { title: string; description: string }> = {
  statistics: {
    title: "סטטיסטיקה",
    description: "מסייע להבין כיצד משתמשים באתר ולמדוד שיפור בחוויית המשתמשים.",
  },
  marketing: {
    title: "שיווק (כולל TikTok Pixel)",
    description: "מאפשר למדוד קמפיינים ולהציג מסרים רלוונטיים יותר.",
  },
  personalization: {
    title: "התאמה אישית",
    description: "משמש להתאמת תוכן והמלצות לצרכים שלכם.",
  },
};

function CookieSettingsModal() {
  const {
    preferences,
    isSettingsOpen,
    closeSettings,
    saveSettings,
    rejectAll,
  } = useCookieConsent();
  const [draft, setDraft] = useState<ConsentCategories>(preferences.categories);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSettingsOpen) {
      setDraft({ ...preferences.categories });
    }
  }, [isSettingsOpen, preferences.categories]);

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    const modalNode = modalRef.current;
    if (!modalNode) {
      return;
    }

    const focusable = Array.from(
      modalNode.querySelectorAll<HTMLElement>(focusableSelectors),
    ).filter((element) => element.offsetParent !== null);

    focusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSettings();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSettingsOpen, closeSettings]);

  const handleToggle = useCallback((category: NonEssentialCategory) => {
    setDraft((prev) => ({
      ...prev,
      essential: true,
      [category]: !prev[category],
    }));
  }, []);

  const handleSave = useCallback(() => {
    saveSettings(draft);
  }, [draft, saveSettings]);

  if (!isSettingsOpen) {
    return null;
  }

  return (
    <div className={styles.modalPortal} role="presentation">
      <div className={styles.backdrop} aria-hidden="true" onClick={closeSettings} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        aria-describedby="cookie-settings-description"
        className={styles.modal}
        ref={modalRef}
      >
        <div className={styles.modalHeader}>
          <h2 id="cookie-settings-title">ניהול הגדרות קוקיז</h2>
          <p id="cookie-settings-description">
            בחרו אילו סוגי קובצי קוקיז לאשר. קוקיז חיוניים מופעלים תמיד כדי שהאתר יעבוד כראוי.
          </p>
        </div>
        <div className={styles.categoryList}>
          <div className={[styles.categoryItem, styles.categoryLocked].join(" ")}>
            <div>
              <span className={styles.categoryTitle}>חיוניים</span>
              <p className={styles.categoryDescription}>
                דרושים לפעילות בסיסית של האתר ואינם ניתנים לכיבוי.
              </p>
            </div>
            <span className={styles.lockBadge}>תמיד פעיל</span>
          </div>
          {Object.entries(CATEGORY_CONTENT).map(([key, value]) => {
            const categoryKey = key as NonEssentialCategory;
            const isChecked = draft[categoryKey];
            return (
              <label key={categoryKey} className={styles.categoryItem}>
                <div>
                  <span className={styles.categoryTitle}>{value.title}</span>
                  <p className={styles.categoryDescription}>{value.description}</p>
                </div>
                <input
                  type="checkbox"
                  className={styles.toggle}
                  checked={isChecked}
                  onChange={() => handleToggle(categoryKey)}
                />
              </label>
            );
          })}
        </div>
        <div className={styles.modalActions}>
          <GlassButton onClick={handleSave} className={styles.saveButton}>
            שמור העדפות
          </GlassButton>
          <button type="button" onClick={rejectAll} className={styles.rejectButton}>
            לא מאשר/ת
          </button>
          <button type="button" onClick={closeSettings} className={styles.closeButton}>
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsentProvider;
