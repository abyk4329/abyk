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
const COOKIE_KEY = "abyk_cookie_consent_v2";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 חודשים

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

function arePreferencesEqual(a: ConsentPreferences, b: ConsentPreferences): boolean {
  return (
    a.status === b.status &&
    a.categories.essential === b.categories.essential &&
    a.categories.statistics === b.categories.statistics &&
    a.categories.marketing === b.categories.marketing &&
    a.categories.personalization === b.categories.personalization
  );
}

function readPreferencesFromCookie(): ConsentPreferences | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookieMatch = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${COOKIE_KEY}=([^;]*)`),
  );

  if (!cookieMatch) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(cookieMatch[1])) as
      | Partial<ConsentPreferences>
      | null;
    if (!parsed || parsed.version !== CONSENT_VERSION) {
      return null;
    }
    return normalizePreferences(parsed);
  } catch (error) {
    console.warn("CookieConsent: Failed to parse consent cookie", error);
    return null;
  }
}

function persistPreferencesToLocalStorage(preferences: ConsentPreferences) {
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
    console.warn("CookieConsent: Failed to persist preferences to localStorage", error);
  }
}

function persistPreferencesToCookie(preferences: ConsentPreferences) {
  if (typeof document === "undefined") {
    return;
  }

  try {
    const payload = encodeURIComponent(
      JSON.stringify({
        ...preferences,
        updatedAt: new Date().toISOString(),
      }),
    );
    document.cookie = `${COOKIE_KEY}=${payload};path=/;max-age=${COOKIE_MAX_AGE_SECONDS};SameSite=Lax;Secure`;
  } catch (error) {
    console.warn("CookieConsent: Failed to persist preferences to cookie", error);
  }
}

function clearPreferencesCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${COOKIE_KEY}=;path=/;max-age=0;SameSite=Lax;Secure`;
}

function clearStoredPreferences() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("CookieConsent: Failed to clear stored preferences", error);
  }
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

  const cookiePreferences = readPreferencesFromCookie();
  let storedPreferences: ConsentPreferences | null = null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ConsentPreferences> | null;
      if (parsed && parsed.version === CONSENT_VERSION) {
        storedPreferences = normalizePreferences(parsed);
      }
    }
  } catch (error) {
    console.warn("CookieConsent: Failed to parse stored preferences", error);
  }

  if (!storedPreferences) {
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
  }

  if (cookiePreferences) {
    if (!storedPreferences || !arePreferencesEqual(storedPreferences, cookiePreferences)) {
      persistPreferencesToLocalStorage(cookiePreferences);
    }
    return cookiePreferences;
  }

  if (storedPreferences) {
    if (storedPreferences.status !== "pending") {
      clearPreferencesCookie();
      clearStoredPreferences();
      return { ...defaultPreferences };
    }
    return storedPreferences;
  }

  return { ...defaultPreferences };
}

function persistPreferences(preferences: ConsentPreferences) {
  persistPreferencesToLocalStorage(preferences);
  persistPreferencesToCookie(preferences);
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

  // We force banner to attach to top on all pages; on home we can optionally center below header (hero) by using margin-top if needed.
  // Reason footer overlap: previous wrapper used relative stacking context and only appeared after scroll because layout height pushed it below fold.
  // Solution: always fixed top with full width, internal max-width for card; optional overlay only on home.
  return (
    <div
      className={[
        "fixed top-0 inset-x-0 z-[120] flex justify-center px-4 sm:px-6 pt-4 sm:pt-6",
        isHomeRoute ? styles.homeOverlay : styles.topBannerWrapper,
      ].join(" ")}
      aria-live="polite"
      role="region"
      aria-label="הודעת שימוש בקוקיז"
    >
      <div
        className={[
          "w-full max-w-3xl rounded-[28px] border-0 px-6 py-5 text-center text-sm sm:text-base shadow-lg",
          styles.card,
          !isHomeRoute ? styles.cardTopAttached : ""
        ].join(" ")}
      >
        <h2 className={["mb-3 text-base font-semibold sm:text-lg", styles.title].join(" ")}>
          אני משתמשת בקובצי קוקיז באתר שלי
        </h2>
        <p className="mx-auto mb-4 max-w-2xl text-xs leading-snug text-[#473b31] sm:text-sm">
          כדי להעניק לכם חוויית גלישה מדויקת ונוחה, אני נעזרת בקובצי קוקיז לאיסוף נתונים סטטיסטיים, להתאמת תוכן אישי ולמדידת אפקטיביות של הפעילות שלי (כולל TikTok Pixel). בלחיצה על &quot;מאשר/ת&quot; אתם מסכימים לשימוש הזה בהתאם למדיניות הפרטיות ותנאי השימוש. המידע נשאר אצלי בלבד ומיועד לשיפור מתמשך של האתר.
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
    description: "עוזר לי להבין איך אתם משתמשים באתר וכיצד לשפר את חוויית הגלישה.",
  },
  marketing: {
    title: "שיווק (כולל TikTok Pixel)",
    description: "מסייע לי למדוד קמפיינים ולהתאים מסרים שיווקיים לרגע הנכון עבורכם.",
  },
  personalization: {
    title: "התאמה אישית",
    description: "מאפשר לי להציע תוכן והמלצות שמדויקים יותר עבורכם באופן אישי.",
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
          <h2 id="cookie-settings-title">העדפות הקוקיז שלכם</h2>
          <p id="cookie-settings-description">
            בחרו אילו סוגי קובצי קוקיז תרצו שאפעיל עבורכם. את הקוקיז החיוניים אני משאירה פעילים תמיד כדי שהאתר יעבוד כמו שצריך.
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
