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
        background: 'linear-gradient(180deg, rgb(253, 252, 251) 0%, rgb(250, 248, 246) 100%)',
        boxShadow: `
          0 8px 24px rgba(159, 133, 114, 0.12),
          0 -4px 12px rgba(255, 255, 255, 0.7),
          inset 0 -1px 2px rgba(255, 255, 255, 0.8)
        `
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-4 sm:py-5 font-normal">
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
