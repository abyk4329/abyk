"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

const cn = (...values: Array<string | false | undefined | null>) =>
  values.filter(Boolean).join(" ");

const getTriggerId = (value: string) => `tab-trigger-${value}`;
const getPanelId = (value: string) => `tab-panel-${value}`;

type TabsContextValue = {
  value: string;
  setValue: (nextValue: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs components must be used within a Tabs parent component.");
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

  const currentValue = isControlled ? value ?? "" : internalValue;

  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      value: currentValue,
      setValue: (next) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onValueChange?.(next);
      },
    }),
    [currentValue, isControlled, onValueChange]
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
    <div
      role="tablist"
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
}

export function TabsTrigger({ value, children, className, ...rest }: TabsTriggerProps) {
  const { value: activeValue, setValue } = useTabsContext();
  const isActive = activeValue === value;
  const triggerId = getTriggerId(value);
  const panelId = getPanelId(value);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    // Get all tab triggers in the same TabsList
    const tablist = e.currentTarget.closest('[role="tablist"]');
    if (!tablist) return;
    
    const triggers = Array.from(tablist.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    if (triggers.length === 0) return;
    const currentIndex = triggers.indexOf(e.currentTarget);
    if (currentIndex === -1) return;
    
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % triggers.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = currentIndex - 1 < 0 ? triggers.length - 1 : currentIndex - 1;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = triggers.length - 1;
    } else {
      return;
    }
    
    const nextTrigger = triggers[nextIndex];
    nextTrigger.focus();
    nextTrigger.click();
  };

  return (
    <button
      type="button"
      role="tab"
      id={triggerId}
      aria-selected={isActive}
      aria-controls={panelId}
      data-state={isActive ? "active" : "inactive"}
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

export function TabsContent({ value, children, className, ...rest }: TabsContentProps) {
  const { value: activeValue } = useTabsContext();
  const isActive = activeValue === value;
  const panelId = getPanelId(value);
  const labelledBy = getTriggerId(value);

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={labelledBy}
      aria-hidden={isActive ? undefined : true}
      hidden={!isActive}
      data-state={isActive ? "active" : "inactive"}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
}
