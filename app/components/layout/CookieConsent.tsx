"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cookie } from "lucide-react";
import { Button } from "@/components/neu";
import { ICON_STROKE, WEALTH_BASE } from "@/lib/constants";

import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cookieConsent:v2";
const LEGACY_KEY = "abyk-cookie-consent";
const CONSENT_VERSION = 2;
const COOKIE_KEY = "abyk_cookie_consent_v2";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 חודשים

function normalizePathValue(value?: string | null): string | undefined {
  if (value == null) {
    return undefined;
  }

  if (value === "" || value === "/") {
    return "/";
  }

  const sanitized = value.replace(/\/+/g, "/");
  const trimmed =
    sanitized.endsWith("/") && sanitized !== "/"
      ? sanitized.slice(0, -1)
      : sanitized;
  return trimmed || "/";
}

const basePrefix = (() => {
  const normalized = normalizePathValue(WEALTH_BASE);
  if (!normalized || normalized === "/") {
    return "";
  }
  return normalized;
})();

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
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
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

const CookieConsentContext = createContext<
  CookieConsentContextValue | undefined
>(undefined);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider"
    );
  }
  return ctx;
}

function ensureEssentialTrue(
  categories: Partial<ConsentCategories> | undefined
) {
  return {
    essential: true,
    statistics: Boolean(categories?.statistics),
    marketing: Boolean(categories?.marketing),
    personalization: Boolean(categories?.personalization),
  } as ConsentCategories;
}

function computeStatus(categories: ConsentCategories): ConsentStatus {
  const flags = [
    categories.statistics,
    categories.marketing,
    categories.personalization,
  ];
  if (flags.every(Boolean)) {
    return "granted";
  }
  if (flags.every((flag) => !flag)) {
    return "denied";
  }
  return "custom";
}

function normalizePreferences(
  preferences: Partial<ConsentPreferences> | null
): ConsentPreferences {
  if (!preferences) {
    return { ...defaultPreferences };
  }

  const categories = ensureEssentialTrue(preferences.categories);
  const status =
    preferences.status === "pending" ? "pending" : computeStatus(categories);

  return {
    version: CONSENT_VERSION,
    status,
    categories,
    updatedAt: preferences.updatedAt ?? new Date().toISOString(),
  };
}

function arePreferencesEqual(
  a: ConsentPreferences,
  b: ConsentPreferences
): boolean {
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
    new RegExp(`(?:^|;\\s*)${COOKIE_KEY}=([^;]*)`)
  );

  if (!cookieMatch) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      decodeURIComponent(cookieMatch[1])
    ) as Partial<ConsentPreferences> | null;
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
    console.warn(
      "CookieConsent: Failed to persist preferences to localStorage",
      error
    );
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
      })
    );
    document.cookie = `${COOKIE_KEY}=${payload};path=/;max-age=${COOKIE_MAX_AGE_SECONDS};SameSite=Lax;Secure`;
  } catch (error) {
    console.warn(
      "CookieConsent: Failed to persist preferences to cookie",
      error
    );
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
    if (
      !storedPreferences ||
      !arePreferencesEqual(storedPreferences, cookiePreferences)
    ) {
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

export function CookieConsentProvider({
  children,
}: CookieConsentProviderProps) {
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
    []
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
      { hideBanner: true }
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
      { hideBanner: true }
    );
    setSettingsOpen(false);
  }, [updatePreferences]);

  const openSettings = useCallback(() => {
    wasBannerVisibleRef.current =
      isBannerVisible || preferences.status === "pending";
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
        { hideBanner: true }
      );
      setSettingsOpen(false);
    },
    [updatePreferences]
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
    ]
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
      <ConsentBanner />
      <CookieSettingsModal />
    </CookieConsentContext.Provider>
  );
}

function ConsentBanner() {
  const { isBannerVisible, acceptAll, rejectAll } = useCookieConsent();
  const pathname = usePathname();

  const homePaths = useMemo(() => {
    const set = new Set<string>();
    set.add("/");
    if (basePrefix) {
      set.add(basePrefix);
    }
    return set;
  }, []);

  const normalizedPath = useMemo(
    () => normalizePathValue(pathname) ?? "/",
    [pathname]
  );
  const isHomePath = homePaths.has(normalizedPath);

  useEffect(() => {
    if (!isBannerVisible) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        rejectAll();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isBannerVisible, rejectAll]);

  useLayoutEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;

    if (isBannerVisible && isHomePath) {
      root.setAttribute("data-cookie-banner", "home");
    } else if (root.getAttribute("data-cookie-banner") === "home") {
      root.removeAttribute("data-cookie-banner");
    }

    return () => {
      if (root.getAttribute("data-cookie-banner") === "home") {
        root.removeAttribute("data-cookie-banner");
      }
    };
  }, [isBannerVisible, isHomePath]);

  if (!isBannerVisible) {
    return null;
  }

  return (
    <>
      <div
        className={styles.bannerOverlay}
        data-modal-backdrop="true"
        aria-hidden="true"
        onClick={rejectAll}
      />

      <div
        className={styles.bannerContainer}
        data-modal="true"
        aria-live="polite"
        role="dialog"
        aria-label="הודעת שימוש בקוקיז"
        aria-modal="true"
      >
        <div className={styles.bannerInner}>
          <div className={`${styles.card} ${styles.bannerCard}`}>
            {/* Close Button */}
            <button
              onClick={rejectAll}
              className={styles.bannerClose}
              aria-label="סגור"
            >
              <svg
                strokeWidth={ICON_STROKE.default}
                className={styles.bannerCloseIcon}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className={styles.bannerContentWrapper}>
              <div className={styles.bannerRow}>
                {/* Icon */}
                <div className={styles.bannerIconBox}>
                  <Cookie
                    aria-hidden="true"
                    strokeWidth={0.8}
                    className={styles.bannerIcon}
                  />
                </div>

                {/* Text Content */}
                <div className={styles.bannerTextWrap}>
                  <p className={styles.bannerText}>
                    אני משתמשת בקוקיז כדי לשפר את חווית הגלישה שלכם. המשך גלישה
                    באתר מהווה הסכמה לשימוש בקוקיז.
                  </p>
                </div>

                {/* Accept Button - Primary Style */}
                <Button
                  onClick={acceptAll}
                  variant="primary"
                  className={styles.acceptButton}
                >
                  הבנתי
                </Button>
              </div>

              {/* Privacy Link */}
              <Link href="/terms" className={styles.bannerLink}>
                תנאי שימוש ומדיניות פרטיות
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const CATEGORY_CONTENT: Record<
  NonEssentialCategory,
  { title: string; description: string }
> = {
  statistics: {
    title: "סטטיסטיקה",
    description:
      "עוזר לי להבין איך אתם משתמשים באתר וכיצד לשפר את חוויית הגלישה.",
  },
  marketing: {
    title: "שיווק (כולל TikTok Pixel)",
    description:
      "מסייע לי למדוד קמפיינים ולהתאים מסרים שיווקיים לרגע הנכון עבורכם.",
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
      modalNode.querySelectorAll<HTMLElement>(focusableSelectors)
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
      <div
        className={styles.backdrop}
        data-modal-backdrop="true"
        aria-hidden="true"
        onClick={closeSettings}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        aria-describedby="cookie-settings-description"
        data-modal="true"
        className={styles.modal}
        ref={modalRef}
      >
        <div className={styles.modalHeader}>
          <h2 id="cookie-settings-title">העדפות הקוקיז שלכם</h2>
          <p id="cookie-settings-description">
            בחרו אילו סוגי קובצי קוקיז תרצו שאפעיל עבורכם. את הקוקיז החיוניים
            אני משאירה פעילים תמיד כדי שהאתר יעבוד כמו שצריך.
          </p>
        </div>
        <div className={styles.categoryList}>
          <div
            className={[styles.categoryItem, styles.categoryLocked].join(" ")}
          >
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
                  <p className={styles.categoryDescription}>
                    {value.description}
                  </p>
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
          <Button onClick={handleSave} className={styles.saveButton}>
            שמור העדפות
          </Button>
          <button
            type="button"
            onClick={rejectAll}
            className={styles.rejectButton}
          >
            לא מאשר/ת
          </button>
          <button
            type="button"
            onClick={closeSettings}
            className={styles.closeButton}
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsentProvider;
