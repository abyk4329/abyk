'use client';

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { ANIMATION } from "@/lib/constants";
import logo from "@/public/brand/logob.png";
import styles from "./SplashScreen.module.css";

interface SplashScreenProps {
  onComplete: () => void;
}

const ORBS = [
  { className: styles.orbPrimary, delay: 0, opacityRange: [0.4, 0.7, 0.4] as [number, number, number] },
  { className: styles.orbSecondary, delay: 0.5, opacityRange: [0.35, 0.65, 0.35] as [number, number, number] },
] as const;

type HaloRing = {
  className: string;
  borderOpacity: number;
  delay: number;
  duration: number;
};

const HALO_RINGS: readonly HaloRing[] = [
  { className: styles.haloRingPrimary, borderOpacity: 0.25, delay: 0.8, duration: 6.0 },
];

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, ANIMATION.splash.totalDuration);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className={["fixed inset-0 z-[100] flex items-center justify-center overflow-hidden", styles.splashScreen].join(" ")}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION.splash.fadeOutDuration, ease: "easeInOut", delay: ANIMATION.splash.fadeOutDelay }}
    >
      <div className="absolute inset-0">
        {ORBS.map((orb, index) => (
          <motion.div
            key={index}
            className={["absolute", styles.orb, orb.className].join(" ")}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: orb.opacityRange ?? [0.3, 0.6, 0.3],
              scale: [0.92, 1.08, 0.92],
              rotate: [0, 12, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          {HALO_RINGS.map((ring, index) => (
            <motion.div
              key={index}
              className={[styles.haloRing, ring.className].join(" ")}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{
                scale: [0.96, 1.04, 0.96],
                opacity: [0.1, ring.borderOpacity, 0.1],
              }}
              transition={{
                duration: ring.duration,
                ease: "easeInOut",
                repeat: Infinity,
                delay: ring.delay,
              }}
            />
          ))}
        </div>
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
            className={["relative rounded-[48px] border-0 px-14 py-16 sm:px-20 sm:py-18 lg:px-24 lg:py-20", styles.logoCard].join(" ")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.splash.logoDuration, delay: ANIMATION.splash.logoDelay, ease: [0.2, 0.95, 0.32, 1] as const }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: ANIMATION.splash.logoDelay + 0.2, ease: [0.18, 0.75, 0.2, 1] as const }}
            >
              <Image
                src={logo}
                alt="Awakening by Ksenia"
                className={["h-40 w-auto object-contain sm:h-48 lg:h-56", styles.logoImage].join(" ")}
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.p
          className={["mt-12 uppercase tracking-[0.32em]", styles.tagline].join(" ")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: ANIMATION.splash.logoDelay + 0.7, ease: "easeOut" }}
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
              className={["rounded-full border-0", styles.progressDot].join(" ")}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.88, 1.15, 0.88],
                filter: ["brightness(1.02)", "brightness(1.22)", "brightness(1.02)"],
              }}
              transition={{
                duration: 1.6,
                ease: "easeInOut",
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
