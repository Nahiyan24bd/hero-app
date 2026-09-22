import React from 'react';
import Image from 'next/image';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="w-full bg-[#f8fafc] dark:bg-[#0b0f19] pt-12 pb-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          We Build <span className="text-[#6366f1] dark:text-[#818cf8]">Productive</span> <br />
          Apps
        </h1>

        {/* Description */}
        <p className="mt-6 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          At HERO.IO, we craft innovative apps designed to make everyday life simpler,
          smarter, and more exciting. Our goal is to turn your ideas into digital experiences
          that truly make an impact.
        </p>

        {/* Store Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <FaGooglePlay className="text-emerald-500 text-lg" />
            <span>Google Play</span>
          </a>

          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <FaApple className="text-cyan-500 text-xl" />
            <span>App Store</span>
          </a>
        </div>

        {/* Mockup Showcase Image */}
         <div className="mt-12 flex justify-center items-center px-4">
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
          <Image
            src="/hero.png"
            alt="HERO.IO Mobile Showcase"
            width={720}
            height={840}
            className="w-full h-auto object-contain mx-auto block drop-shadow-xl"
            priority
            unoptimized
          />
        </div>
        </div>
      </div>
    </section>
  );
}