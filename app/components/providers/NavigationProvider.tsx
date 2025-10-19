"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface NavigationOverrides {
  isVisible?: boolean;
  canGoBack?: boolean;
  onGoBack?: () => void;
  canGoForward?: boolean;
  onGoForward?: () => void;
  onGoHome?: () => void;
  showHeader?: boolean;
  showFooter?: boolean;
  lockScroll?: boolean;
}

type NavigationSetter = (overrides: NavigationOverrides | undefined) => void;

const NavigationOverridesContext = createContext<
  NavigationOverrides | undefined
>(undefined);
const NavigationSetterContext = createContext<NavigationSetter | undefined>(
  undefined
);

interface NavigationRootProps {
  children: ReactNode;
}

export function NavigationRoot({ children }: NavigationRootProps) {
  const [overrides, setOverrides] = useState<NavigationOverrides | undefined>(
    undefined
  );

  const memoizedOverrides = useMemo(() => overrides, [overrides]);

  return (
    <NavigationSetterContext.Provider value={setOverrides}>
      <NavigationOverridesContext.Provider value={memoizedOverrides}>
        {children}
      </NavigationOverridesContext.Provider>
    </NavigationSetterContext.Provider>
  );
}

interface NavigationProviderProps {
  value: NavigationOverrides;
  children: ReactNode;
}

export function NavigationProvider({
  value,
  children,
}: NavigationProviderProps) {
  const setOverrides = useContext(NavigationSetterContext);

  useIsomorphicLayoutEffect(() => {
    if (!setOverrides) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "NavigationProvider was rendered outside of NavigationRoot. Overrides will be ignored."
        );
      }
      return;
    }

    setOverrides(value);
    return () => {
      setOverrides(undefined);
    };
  }, [setOverrides, value]);

  return <>{children}</>;
}

export function useNavigationOverrides(): NavigationOverrides {
  const context = useContext(NavigationOverridesContext);
  if (!context) {
    throw new Error(
      "useNavigationOverrides must be used within a NavigationRoot"
    );
  }

  return context;
}

export function useOptionalNavigationOverrides():
  | NavigationOverrides
  | undefined {
  return useContext(NavigationOverridesContext);
}
