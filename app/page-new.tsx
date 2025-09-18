import Image from "next/image";

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-center min-h-screen">
      <div className="space-y-8 text-center slide-up">
        {/* לוגו */}
        <div className="logo animate-logo-entrance">
          <Image
            src="/newlogos/logowithsloganhomepage.png"
            alt="Awakening by Ksenia - Unlock the light within you"
            width={480}
            height={300}
            className="mx-auto"
            priority
          />
        </div>

        {/* כותרת ראשית */}
        <h1 className="font-bold text-gold-deep animate-fade-in-float">
          התעוררות
        </h1>

        {/* תת כותרת */}
        <h2 className="font-medium text-gold animate-fade-in">
          חישוב קוד נומרולוגי אישי
        </h2>

        {/* תיאור */}
        {/* היה: גלה את המשמעות הנומרולוגית שלך ופתח שער להבנה עמוקה יותר של עצמך */}
        <p className="max-w-2xl px-4 mx-auto text-text-secondary animate-fade-in text-ms-0 md:text-ms-1">
          גלו את המשמעות הנומרולוגית שלכם ופתחו שער להבנה עמוקה יותר על עצמכם
        </p>

        {/* כפתור */}
        {/* היה: חשבי קוד כסף ✨ */}
        <a
          href="/money-code"
          className="inline-block px-8 py-4 text-ms-1 font-semibold transition-all duration-300 rounded-lg btn bg-gold hover:bg-gold-deep text-charcoal hover:scale-105 animate-fade-in"
        >
          חשבו קוד כסף
        </a>

        <p className="text-ms--1 text-text-secondary animate-fade-in">
          פירוש מלא ומותאם אישית - 97₪
        </p>

        {/* חתימה */}
        <div className="mt-12 signature animate-fade-in-float">
          <Image
            src="/newlogos/signature.svg"
            alt="by Ksenia Signature"
            width={200}
            height={100}
            className="mx-auto"
          />
        </div>
      </div>
    </main>
  );
}
