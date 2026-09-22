import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full bg-[#00172d] text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="HERO.IO"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-lg text-white tracking-wide">
              HERO.IO
            </span>
          </Link>

          <div className="flex flex-col items-center sm:items-end gap-2.5">
            <span className="text-sm font-semibold text-slate-200 tracking-wide">
              Social Links
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-7 h-7 rounded-full bg-white text-[#00172d] flex items-center justify-center hover:opacity-90 transition-opacity text-xs"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-full bg-white text-[#00172d] flex items-center justify-center hover:opacity-90 transition-opacity text-xs"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white text-[#00172d] flex items-center justify-center hover:opacity-90 transition-opacity text-xs"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 text-center text-xs sm:text-sm text-slate-400 font-normal">
          Copyright © 2025 - All right reserved
        </div>
      </div>
    </footer>
  );
}