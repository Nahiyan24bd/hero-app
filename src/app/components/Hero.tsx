import React from 'react';
import Image from 'next/image';
import { IoLogoGooglePlaystore } from 'react-icons/io5';
import { FaApple } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="bg-white pt-14 md:pt-20 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1e293b] tracking-tight leading-tight">
          We Build <br className="hidden sm:inline" />
          <span className="text-[#6366f1]">Productive</span> Apps
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          At HERO.IO , we craft innovative apps designed to make everyday life simpler,
          smarter, and more exciting. Our goal is to turn your ideas into digital
          experiences that truly make an impact.
        </p>

        {/* Store Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <IoLogoGooglePlaystore className="text-2xl text-[#01875f]" />
            <span className="text-sm sm:text-base font-bold text-slate-800">
              Google Play
            </span>
          </a>

          <a
            href="https://apple.com/app-store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-6 h-6 rounded-md bg-[#0ea5e9] flex items-center justify-center text-white">
              <FaApple className="text-sm" />
            </div>
            <span className="text-sm sm:text-base font-bold text-slate-800">
              App Store
            </span>
          </a>
        </div>
      </div>

      {/* Mockup Showcase - Upgraded Size & Responsive */}
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
    </section>
  );
}