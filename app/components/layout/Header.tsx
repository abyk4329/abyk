interface HeaderProps {
  isHomePage?: boolean;
}

export function Header({ isHomePage = true }: HeaderProps) {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-4 sm:py-5">
          <p 
            className="uppercase whitespace-nowrap"
            style={{ 
              color: '#9f8572',
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