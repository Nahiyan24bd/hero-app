'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiDownload } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface InstalledApp {
  id: number;
  title: string;
  image?: string;
  downloads: string;
  ratingAvg: number;
  size: number;
}

export default function InstallationPage() {
  const [apps, setApps] = useState<InstalledApp[]>([]);
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('installedApps');
      if (stored) {
        const parsed: InstalledApp[] = JSON.parse(stored);
        queueMicrotask(() => {
          setApps(parsed);
          setIsLoaded(true);
        });
        return;
      }
    } catch (e) {
      console.error('Failed to parse installedApps', e);
    }

    queueMicrotask(() => {
      setIsLoaded(true);
    });
  }, []);

  const handleUninstall = (id: number, title: string) => {
    const updated = apps.filter((app) => app.id !== id);
    setApps(updated);
    localStorage.setItem('installedApps', JSON.stringify(updated));
    toast.warn(`${title} uninstalled.`);
  };

  const sortedApps = [...apps].sort((a, b) => {
    if (sortOrder === 'asc') return a.size - b.size;
    if (sortOrder === 'desc') return b.size - a.size;
    return 0;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Your Installed Apps
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-500">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>

      {/* Top Bar: Count & Sort Dropdown */}
      <div className="mt-12 flex items-center justify-between pb-4">
        <span className="font-bold text-slate-900 text-base sm:text-lg">
          {apps.length} Apps Found
        </span>

        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'default' | 'asc' | 'desc')}
            className="appearance-none bg-white border border-slate-200 text-slate-600 text-xs sm:text-sm font-medium py-2 pl-3.5 pr-8 rounded-lg shadow-sm outline-none cursor-pointer focus:border-indigo-500 transition-colors"
          >
            <option value="default">Sort By Size</option>
            <option value="desc">Size: High to Low</option>
            <option value="asc">Size: Low to High</option>
          </select>
          <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* App List / Empty State */}
      {!isLoaded ? (
        <div className="mt-4 flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm animate-pulse h-24"
            />
          ))}
        </div>
      ) : apps.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 mt-4">
          <p className="text-slate-500 text-base">No installed applications found.</p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {sortedApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex items-center justify-between gap-4 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-100 overflow-hidden relative shrink-0">
                  {app.image ? (
                    <Image
                      src={app.image}
                      alt={app.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200" />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-semibold text-slate-800 truncate">
                    {app.title}
                  </h2>

                  <div className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
                    <span className="flex items-center gap-1 font-semibold text-[#059669]">
                      <FiDownload className="stroke-[2.5]" />
                      {app.downloads}
                    </span>

                    <span className="flex items-center gap-1 font-semibold text-[#d97706]">
                      <FaStar />
                      {app.ratingAvg ? app.ratingAvg.toFixed(1) : '5.0'}
                    </span>

                    <span className="text-slate-400 font-medium">
                      {app.size} MB
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleUninstall(app.id, app.title)}
                className="px-5 sm:px-6 py-2 bg-[#00c988] hover:bg-[#00b077] active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all shrink-0"
              >
                Uninstall
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}