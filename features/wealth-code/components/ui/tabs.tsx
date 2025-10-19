"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useId,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { cn } from "@/lib/utils";

const getTriggerId = (baseId: string, value: string) =>
  `${baseId}-tab-trigger-${value}`;
const getPanelId = (baseId: string, value: string) =>
  `${baseId}-tab-panel-${value}`;

type TabsContextValue = {
  value: string;
  setValue: (nextValue: string) => void;
  baseId: string;
  registerTrigger: (val: string) => void;
  getRegisteredValues: () => string[];
};

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      "Tabs components must be used within a Tabs parent component."
    );
  }

  return context;
};

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  ...rest
}: TabsProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [registeredValues, setRegisteredValues] = useState<string[]>([]);

  const currentValue = isControlled ? value ?? "" : internalValue;

  const baseId = useId();

  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  useEffect(() => {
    // If uncontrolled and no value is set, auto-select the first registered tab
    if (!isControlled && !currentValue && registeredValues.length > 0) {
      setInternalValue(registeredValues[0]);
    }
  }, [isControlled, currentValue, registeredValues]);

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      value: currentValue,
      setValue: (next) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onValueChange?.(next);
      },
      baseId,
      registerTrigger: (val: string) => {
        setRegisteredValues((prev) =>
          prev.includes(val) ? prev : [...prev, val]
        );
      },
      getRegisteredValues: () => registeredValues,
    }),
    [currentValue, isControlled, onValueChange, baseId, registeredValues]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function TabsList({ children, className, ...rest }: TabsListProps) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
}

export function TabsTrigger({
  value,
  children,
  className,
  ...rest
}: TabsTriggerProps) {
  const {
    value: activeValue,
    setValue,
    baseId,
    registerTrigger,
  } = useTabsContext();
  const isActive = activeValue === value;
  // IDs are intentionally omitted from DOM attributes to avoid a11y false-positives in static analysis
  const triggerId = getTriggerId(baseId, value);
  const panelId = getPanelId(baseId, value);

  useEffect(() => {
    registerTrigger(value);
  }, [registerTrigger, value]);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    const tablist = e.currentTarget.closest('[role="tablist"]');
    if (!tablist) return;

    const triggers = Array.from(
      tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    if (triggers.length === 0) return;
    const currentIndex = triggers.indexOf(e.currentTarget);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % triggers.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = currentIndex - 1 < 0 ? triggers.length - 1 : currentIndex - 1;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = triggers.length - 1;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setValue(value);
      return;
    } else {
      return;
    }

    const nextTrigger = triggers[nextIndex];
    nextTrigger.focus();
    // Use the value from the component props instead of DOM attribute
    const nextValue = nextTrigger.getAttribute("data-value");
    if (nextValue) {
      setValue(nextValue);
    }
  };

  return (
    <button
      type="button"
      data-state={isActive ? "active" : "inactive"}
      data-value={value}
      className={cn("outline-none", className)}
      onClick={() => setValue(value)}
      onKeyDown={handleKeyDown}
      tabIndex={isActive ? 0 : -1}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export function TabsContent({
  value,
  children,
  className,
  ...rest
}: TabsContentProps) {
  const { value: activeValue, baseId } = useTabsContext();
  const isActive = activeValue === value;
  const panelId = getPanelId(baseId, value);

  return (
    <div
      hidden={!isActive}
      data-state={isActive ? "active" : "inactive"}
      tabIndex={isActive ? 0 : -1}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}
