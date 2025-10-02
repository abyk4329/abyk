"use client";

import { useState, useEffect, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { NavigationButtons } from "./layout/NavigationButtons";
import { SplashScreen } from "./sections/SplashScreen";

type PageType = 'home' | 'terms' | 'calculator' | 'result' | 'sales' | 'thankyou' | 'interpretations' | 'design' | 'nav';

export function RootLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [pageHistory, setPageHistory] = useState<string[]>(['/']);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Check if splash was already shown in this session
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const splashShown = sessionStorage.getItem('splashShown');
      return splashShown !== 'true';
    }
    return true;
  });

  // Save that splash was shown
  const handleSplashComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splashShown', 'true');
    }
    setShowSplash(false);
  };

  // Track navigation history
  useEffect(() => {
    setPageHistory(prev => {
      // If we're not at the end, truncate forward history
      if (currentIndex < prev.length - 1) {
        const newHistory = prev.slice(0, currentIndex + 1);
        // Don't add if it's the same as current
        if (newHistory[newHistory.length - 1] === pathname) return prev;
        setCurrentIndex(newHistory.length);
        return [...newHistory, pathname];
      }
      
      // Don't add if it's the same as the last page
      if (prev[prev.length - 1] === pathname) return prev;
      setCurrentIndex(prev.length);
      return [...prev, pathname];
    });
  }, [pathname, currentIndex]);

  // Scroll to top whenever page changes
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    return () => clearTimeout(scrollTimeout);
  }, [pathname]);

  const handleGoBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const previousPage = pageHistory[newIndex];
      setCurrentIndex(newIndex);
      router.push(previousPage);
    }
  };

  const handleGoForward = () => {
    if (currentIndex < pageHistory.length - 1) {
      const newIndex = currentIndex + 1;
      const nextPage = pageHistory[newIndex];
      setCurrentIndex(newIndex);
      router.push(nextPage);
    }
  };

  const handleGoHome = () => {
    if (pathname !== '/') {
      const newHistory = pageHistory.slice(0, currentIndex + 1);
      setPageHistory([...newHistory, '/']);
      setCurrentIndex(newHistory.length);
      router.push('/');
    }
  };

  const isHomePage = pathname === '/';
  const showNavButtons = !isHomePage && !showSplash;

  return (
    <>
      {showSplash && (
        <AnimatePresence mode="wait">
          <SplashScreen 
            key="splash"
            onComplete={handleSplashComplete} 
          />
        </AnimatePresence>
      )}

      {!showSplash && (
        <>
          <Header isHomePage={isHomePage} />
          
          {showNavButtons && (
            <NavigationButtons
              onGoBack={handleGoBack}
              onGoForward={handleGoForward}
              onGoHome={handleGoHome}
              canGoBack={currentIndex > 0}
              canGoForward={currentIndex < pageHistory.length - 1}
            />
          )}
          
          <main className="flex flex-1 flex-col">
            {children}
          </main>
          
          <Footer />
        </>
      )}
    </>
  );
}
