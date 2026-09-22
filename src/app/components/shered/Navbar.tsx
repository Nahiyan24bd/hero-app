'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Apps', href: '/apps' },
  { name: 'Installation', href: '/installation' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="HERO.IO"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            priority
          />
          <span className="font-bold text-lg text-[#6366f1] tracking-wide">
            HERO.IO
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors hover:text-purple-600 relative py-1 ${
                  isActive ? 'text-purple-600 font-semibold' : ''
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Contribute Button */}
        <div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#7c3aed] to-[#6d28d9] text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm hover:opacity-95 transition-opacity"
          >
            <FaGithub className="text-sm sm:text-base" />
            <span>Contribute</span>
          </a>
        </div>

      </div>
    </header>
  );
}