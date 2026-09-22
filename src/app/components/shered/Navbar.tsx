'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon, FiHeart } from 'react-icons/fi';
import { useTheme } from 'next-themes';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Apps', href: '/apps' },
  { name: 'Installation', href: '/installation' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    // Timeout দিয়ে রেন্ডার সাইকেলের বাইরে স্টেট আপডেট করা হলো যাতে লিন্টার ওয়ার্নিং না দেয়
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const updateWishlist = () => {
      try {
        const saved: number[] = JSON.parse(
          localStorage.getItem('wishlist_apps') || '[]'
        );
        setWishlistCount(saved.length);
      } catch {
        setWishlistCount(0);
      }
    };

    updateWishlist();
    window.addEventListener('storage', updateWishlist);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', updateWishlist);
    };
  }, []);

  // ডার্ক না লাইট—সিস্টেম থিমসহ আসল স্টেট নির্ণয়
  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isDark = currentTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors">
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors hover:text-purple-600 dark:hover:text-purple-400 relative py-1 ${
                  isActive ? 'text-purple-600 dark:text-purple-400 font-semibold' : ''
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Controls: Theme Toggle + Wishlist + Contribute */}
        <div className="flex items-center gap-3">
          {/* Wishlist Link */}
          <Link
            href="/apps"
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Wishlist Items"
          >
            <FiHeart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Dark Mode Toggle */}
          {mounted ? (
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FiSun className="w-5 h-5 text-amber-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          ) : (
            <div className="w-9 h-9" />
          )}

          {/* GitHub Contribute Button */}
          <a
            href="https://github.com/Nahiyan24bd"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 bg-linear-to-r from-[#7c3aed] to-[#6d28d9] text-white text-xs sm:text-sm font-medium rounded-lg shadow-sm hover:opacity-95 transition-opacity"
          >
            <FaGithub className="text-sm sm:text-base" />
            <span>Contribute</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === item.href
                  ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}