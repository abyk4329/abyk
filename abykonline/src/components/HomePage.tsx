import Image from "next/image";
import logoImage from "@/assets/98ba3b7f347e523ebb8bf2cb6df3ddd5ab3385a0.png";
import { Button } from "./ui/button";

interface HomePageProps {
  onShowCalculator: () => void;
}

export function HomePage({
  onShowCalculator,
}: HomePageProps) {
  return (
    <div className="relative flex min-h-[120vh] flex-col pb-24" lang="he">
      {/* Overlays over global body background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent via-50% to-rose-100/25 sm:bg-gradient-to-b sm:from-orange-50/20 sm:via-transparent sm:to-rose-50/20"></div>
        <div className="absolute inset-0 backdrop-saturate-110 backdrop-contrast-102 backdrop-brightness-102"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-full flex-col">
        {/* Main Content - Logo and Calculator Button */}
        <main className="flex flex-1 items-center justify-center px-4 pt-16 pb-32 sm:px-6 sm:pt-24 sm:pb-36">
          <div className="text-center max-w-4xl w-full">
            {/* Logo */}
            <div className="sm:mb-16 mt-4 mb-12">
              <Image
                src={logoImage}
                alt="AWAKENING"
                className="mx-auto h-40 w-auto opacity-95 drop-shadow-2xl sm:h-52"
                priority
              />
            </div>

            {/* Calculator Button */}
            <div className="backdrop-blur-xl rounded-3xl border shadow-2xl max-w-md mx-auto bg-[rgba(254,254,254,0.12)] border-[rgba(135,103,79,0.2)] p-8 sm:p-12">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl mb-6 font-normal tracking-wide drop-shadow-lg font-['Assistant']"
                style={{ color: "#87674F" }}
              >
                גלו את קוד העושר שלכם
              </h2>
              <p className="text-[rgba(149,112,82,1)] font-light mb-8 leading-relaxed drop-shadow-md font-['Assistant'] tracking-wide text-[14px]">
                לחישוב וקבלת קוד האישי על פי תאריך לידה
              </p>
              <Button
                size="lg"
                onClick={onShowCalculator}
                className="w-full sm:w-auto font-['Assistant'] tracking-[0.12em]"
              >
                מחשבון קוד העושר
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}