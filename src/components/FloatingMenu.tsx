import { useState } from 'react';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L3 9v11a2 2 0 002 2h4v-7h6v7h4a2 2 0 002-2V9L12 2z" />
        </svg>
      ),
      label: 'בית',
      position:
        'group-hover:-translate-y-[140px] group-hover:-translate-x-[120px]',
      delay: 'delay-[50ms]',
    },
    {
      href: '/tools/wealth-code/calculator',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      label: 'מחשבון',
      position:
        'group-hover:-translate-y-[140px] group-hover:-translate-x-[60px]',
      delay: 'delay-[100ms]',
    },
    {
      href: '/ui-showcase',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
          />
        </svg>
      ),
      label: 'קומפוננטים',
      position: 'group-hover:-translate-y-[160px] group-hover:translate-x-0',
      delay: 'delay-[125ms]',
    },
    {
      href: '/login',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: 'התחברות',
      position:
        'group-hover:-translate-y-[140px] group-hover:translate-x-[60px]',
      delay: 'delay-[150ms]',
    },
    {
      href: 'https://wa.me/972524616121',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      label: 'WhatsApp',
      position:
        'group-hover:-translate-y-[140px] group-hover:translate-x-[120px]',
      delay: 'delay-[200ms]',
    },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 pb-4 ${
        isOpen ? 'is-open' : ''
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex justify-center items-end group">
        {/* Main Button */}
        <button
          onClick={toggleMenu}
          className="relative w-16 h-16 neu-raised-min rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50 bg-gradient-to-br from-accent to-support text-white hover:shadow-neu-inset"
          aria-label="תפריט ניווט"
        >
          <svg
            className={`w-8 h-8 transition-transform duration-500 ease-in-out ${
              isOpen ? 'rotate-45' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Menu Items */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex justify-center items-end z-40">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={
                item.href.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              className={`absolute transform -translate-x-1/2 opacity-0 ${
                isOpen ? 'opacity-100' : ''
              } ${
                item.position
              } transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
                item.delay
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 neu-raised-min bg-surface rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-neu-inset text-text">
                  <div className="text-heading transition-colors duration-300 hover:text-text">
                    {item.icon}
                  </div>
                </div>
                <span
                  className={`text-xs font-bold text-text text-center mt-2 block opacity-0 ${
                    isOpen ? 'opacity-100' : ''
                  } transition-opacity duration-300 delay-300 whitespace-nowrap`}
                >
                  {item.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
