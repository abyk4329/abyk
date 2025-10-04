'use client';

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { ANIMATION } from "@/lib/constants";
import logo from "@/public/brand/logob.png";

interface SplashScreenProps {
  onComplete: () => void;
}

type Orb = {
  size: number;
  blur: number;
  hueRotate: string;
  delay: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

const ORBS: readonly Orb[] = [
  { size: 320, blur: 140, top: "8%", right: "-10%", hueRotate: "15deg", delay: 0 },
  { size: 380, blur: 180, bottom: "-16%", left: "-8%", hueRotate: "-10deg", delay: 0.3 },
  { size: 260, blur: 110, top: "55%", left: "50%", hueRotate: "20deg", delay: 0.6 },
  { size: 200, blur: 85, top: "25%", left: "15%", hueRotate: "8deg", delay: 0.9 },
];

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, ANIMATION.splash.totalDuration);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION.splash.fadeOutDuration, ease: "easeInOut", delay: ANIMATION.splash.fadeOutDelay }}
      style={{
        background: "radial-gradient(circle at top, #fefdfc 0%, #f5f1ed 45%, #e7ded7 100%)",
      }}
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8), transparent 45%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.65), transparent 40%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.6), transparent 42%)",
          }}
        />

        {ORBS.map((orb, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.92, 1.08, 0.92],
              rotate: [0, 12, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            }}
            style={{
              width: orb.size,
              height: orb.size,
              filter: `blur(${orb.blur}px) hue-rotate(${orb.hueRotate}) brightness(1.05)`,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(213, 192, 177, 0.4))",
              top: orb.top,
              bottom: orb.bottom,
              left: orb.left,
              right: orb.right,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 0.5, 0.25, 0.98] as const }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "inset 0 1px 3px rgba(255, 255, 255, 0.85), inset 20px 20px 60px rgba(159, 133, 114, 0.1), 18px 18px 45px rgba(159, 133, 114, 0.24), -18px -18px 45px rgba(255, 255, 255, 0.9)",
                "inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 22px 22px 65px rgba(159, 133, 114, 0.12), 20px 20px 50px rgba(159, 133, 114, 0.26), -20px -20px 50px rgba(255, 255, 255, 0.95)",
                "inset 0 1px 3px rgba(255, 255, 255, 0.85), inset 20px 20px 60px rgba(159, 133, 114, 0.1), 18px 18px 45px rgba(159, 133, 114, 0.24), -18px -18px 45px rgba(255, 255, 255, 0.9)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="relative rounded-[48px] border-0 px-14 py-16 sm:px-20 sm:py-18 lg:px-24 lg:py-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.splash.logoDuration, delay: ANIMATION.splash.logoDelay, ease: [0.2, 0.95, 0.32, 1] as const }}
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.99), rgba(245,241,237,0.94))",
              boxShadow:
                "32px 32px 95px rgba(159, 133, 114, 0.3), -42px -42px 115px rgba(255, 255, 255, 1), inset 5px 5px 14px rgba(255, 255, 255, 0.88), inset -5px -5px 14px rgba(211, 198, 189, 0.18)",
              backdropFilter: "blur(28px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: ANIMATION.splash.logoDelay + 0.2, ease: [0.18, 0.75, 0.2, 1] as const }}
            >
              <Image
                src={logo}
                alt="Awakening by Ksenia"
                className="h-40 w-auto object-contain sm:h-48 lg:h-56"
                priority
                style={{ filter: "drop-shadow(0 14px 35px rgba(94, 73, 52, 0.28))" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-12 uppercase tracking-[0.32em]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: ANIMATION.splash.logoDelay + 0.7, ease: "easeOut" }}
          style={{
            color: "rgba(135, 103, 79, 0.88)",
            fontSize: "clamp(0.85rem, 2.4vw, 1.1rem)",
            fontWeight: 300,
            textShadow: "0 4px 14px rgba(94, 73, 52, 0.2)",
          }}
        >
          Your Personal Space for Growth
        </motion.p>

        <motion.div
          className="mt-8 flex gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delayChildren: ANIMATION.splash.logoDelay + 1, staggerChildren: 0.2 },
            },
          }}
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="h-3.5 w-3.5 rounded-full border-0"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.88, 1.15, 0.88],
              }}
              transition={{
                duration: 1.4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: index * 0.2,
              }}
              style={{
                background:
                  "linear-gradient(145deg, rgba(248, 244, 240, 0.98), rgba(255, 255, 255, 0.88))",
                boxShadow:
                  "inset 5px 5px 10px rgba(159, 133, 114, 0.18), inset -5px -5px 10px rgba(255, 255, 255, 0.85)",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
