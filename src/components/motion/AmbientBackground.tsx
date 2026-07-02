"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80";

export function AmbientBackground() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 3000], [0, 420]);
  const scale = useTransform(scrollY, [0, 3000], [1, 1.12]);
  const opacity = useTransform(scrollY, [0, 600, 1800, 4000], [1, 0.55, 0.35, 0.22]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y, scale, opacity }}>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="hero-ken-burns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0c0c0c]/25" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/20 via-transparent to-[#0c0c0c]/60" />
    </div>
  );
}

export { HERO_IMAGE };
