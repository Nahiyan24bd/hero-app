'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiDownload, FiShare2, FiHeart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface AppItem {
  id: number;
  title: string;
  image: string;
  companyName: string;
  description: string;
  size: number;
  reviews: string;
  ratingAvg: number;
  downloads: string;
}

const categories = ['All', 'Productivity', 'Social', 'Gaming', 'Tools'];

export default function AppsPage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'default' | 'rating' | 'size'>('default');
  const [wishlist, setWishlist] = useState<number[]>([]);

useEffect(() => {
  fetch('/data.json')
    .then((res) => res.json())
    .then((data: AppItem[]) => {
      setApps(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });

  // রেন্ডার সাইকেলের বাইরে শিডিউল করা হলো
  queueMicrotask(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('wishlist_apps') || '[]');
      setWishlist(saved);
    } catch {
      setWishlist([]);
    }
  });
}, []);

  const toggleWishlist = (e: React.MouseEvent, id: number, title: string) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: number[];
    if (wishlist.includes(id)) {
      updated = wishlist.filter((item) => item !== id);
      toast.info(`${title} removed from favorites`);
    } else {
      updated = [...wishlist, id];
      toast.success(`${title} added to favorites!`);
    }
    setWishlist(updated);
    localStorage.setItem('wishlist_apps', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleShare = async (e: React.MouseEvent, app: AppItem) => {
    e.preventDefault();
    e.stopPropagation();
    const appUrl = `${window.location.origin}/apps/${app.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: app.title, text: `Check out ${app.title}!`, url: appUrl });
      } catch {}
    } else {
      navigator.clipboard.writeText(appUrl);
      toast.success('App link copied to clipboard!');
    }
  };

const filteredApps = useMemo(() => {
  let result = apps.filter((app) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      app.title.toLowerCase().includes(q) ||
      app.companyName.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q);

    const desc = app.description.toLowerCase();
    let matchesCategory = true;

    if (selectedCategory === 'Favorites') {
      matchesCategory = wishlist.includes(app.id);
    } else if (selectedCategory === 'Productivity') {
      matchesCategory = /work|notes|task|email|docs/.test(desc);
    } else if (selectedCategory === 'Social') {
      matchesCategory = /message|chat|social|dating|call/.test(desc);
    } else if (selectedCategory === 'Gaming') {
      matchesCategory = /game|battle|play|puzzle/.test(desc);
    } else if (selectedCategory === 'Tools') {
      matchesCategory = /tool|scanner|vpn|browser|translate/.test(desc);
    }

    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'rating') result = [...result].sort((a, b) => b.ratingAvg - a.ratingAvg);
  else if (sortBy === 'size') result = [...result].sort((a, b) => b.size - a.size);

  return result;
}, [apps, searchQuery, selectedCategory, sortBy, wishlist]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore All Apps
          </h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Browse, filter, and install apps from our complete catalog.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-800">
            <div className="relative w-full sm:max-w-md">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                placeholder="Search by title, publisher or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <label htmlFor="sortBy" className="text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 focus:outline-none focus:border-purple-600"
              >
                <option value="default">Default</option>
                <option value="rating">Top Rated</option>
                <option value="size">Size (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#7c3aed] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 animate-pulse">
                <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded mt-4 w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded mt-2 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <Link
                href={`/apps/${app.id}`}
                key={app.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 hover:shadow-lg dark:hover:border-purple-900/40 transition-all flex flex-col justify-between relative"
              >
                <div>
                  {/* Share & Wishlist Floating Actions */}
                  <div className="absolute top-6 right-6 z-10 flex gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => toggleWishlist(e, app.id, app.title)}
                      className="p-2 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500 shadow-xs"
                      title="Add to Wishlist"
                    >
                      <FiHeart className={`text-sm ${wishlist.includes(app.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleShare(e, app)}
                      className="p-2 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-purple-600 shadow-xs"
                      title="Share App"
                    >
                      <FiShare2 className="text-sm" />
                    </button>
                  </div>

                  <div className="w-full aspect-square rounded-xl bg-slate-50 dark:bg-slate-800/50 p-6 relative flex items-center justify-center">
                    <Image
                      src={app.image}
                      alt={app.title}
                      fill
                      unoptimized
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="mt-4">
                    <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {app.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">{app.companyName}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <FiDownload className="text-xs" />
                    <span>{app.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-500 text-xs font-semibold">
                    <FaStar className="text-xs" />
                    <span>{app.ratingAvg ? app.ratingAvg.toFixed(1) : '5.0'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}