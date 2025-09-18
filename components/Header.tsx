export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full bg-ivory/70 backdrop-blur-lg border-b border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
      <div className="px-4 py-3 md:py-4">
        <div className="assistant-light uppercase text-center tracking-[0.15em] text-espresso">
          <span className="block text-[var(--ms-0)] md:text-[var(--ms-1)] lg:text-[calc(var(--ms-1)*1.05)]">
            YOUR PERSONAL SPACE FOR GROWTH
          </span>
        </div>
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent" />
    </header>
  );
}
