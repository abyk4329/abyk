'use client';

interface HeaderProps {
  isHomePage?: boolean;
}

export function Header({ isHomePage = true }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-0"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
        height: 'calc(var(--header-height) + env(safe-area-inset-top))',
        background: isHomePage ? 'transparent' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(245, 241, 237, 0.92))',
        boxShadow: isHomePage
          ? `0 8px 24px rgba(159, 133, 114, 0.12), 0 -4px 12px rgba(255, 255, 255, 0.7), inset 0 -1px 2px rgba(255, 255, 255, 0.8)`
          : `0 10px 28px rgba(159, 133, 114, 0.2), 0 1px 3px rgba(255, 255, 255, 0.94), inset 0 -1px 3px rgba(255, 255, 255, 0.9)`
      }}
    >
      <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-center font-normal">
          <p 
            className="uppercase whitespace-nowrap"
            style={{ 
              color: 'rgb(159, 133, 114)',
              fontSize: 'clamp(0.85rem, 2.5vw, 1.125rem)',
              fontWeight: '300',
              letterSpacing: '0.2em',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            Your Personal Space for Growth
          </p>
        </div>
      </div>
    </header>
  );
}
