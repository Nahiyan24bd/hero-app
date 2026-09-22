'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiDownload } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

interface RatingDistribution {
  name: string;
  count: number;
}

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
  ratings?: RatingDistribution[];
}

export default function AppsPage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'rating' | 'size'>('default');

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data: AppItem[]) => {
        setApps(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load apps:', err);
        setLoading(false);
      });
  }, []);

  const filteredApps = useMemo(() => {
    let result = apps.filter((app) => {
      const q = searchQuery.toLowerCase();
      return (
        app.title.toLowerCase().includes(q) ||
        app.companyName.toLowerCase().includes(q)
      );
    });

    if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.ratingAvg - a.ratingAvg);
    } else if (sortBy === 'size') {
      result = [...result].sort((a, b) => b.size - a.size);
    }

    return result;
  }, [apps, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore All Apps
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500">
            Browse our full catalog of productive, social, and entertainment apps.
          </p>
        </div>

        {/* Controls: Search and Sort */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs border border-slate-100">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search by title or publisher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label htmlFor="sortBy" className="text-xs sm:text-sm font-medium text-slate-500 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:border-purple-600"
            >
              <option value="default">Default</option>
              <option value="rating">Top Rated</option>
              <option value="size">Size (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-700">{filteredApps.length}</span> apps
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs animate-pulse">
                <div className="w-full aspect-square bg-slate-200 rounded-xl" />
                <div className="h-4 bg-slate-200 rounded mt-4 w-3/4" />
                <div className="h-3 bg-slate-200 rounded mt-2 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="mt-16 text-center py-12 bg-white rounded-2xl border border-slate-100">
            <p className="text-lg font-semibold text-slate-700">No apps found</p>
            <p className="text-sm text-slate-400 mt-1">Try searching for something else</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <Link
                href={`/apps/${app.id}`}
                key={app.id}
                className="group bg-white rounded-2xl p-4 shadow-xs hover:shadow-md border border-slate-100 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-full aspect-square rounded-xl bg-slate-50 p-6 overflow-hidden relative flex items-center justify-center">
                    <Image
                      src={app.image}
                      alt={app.title}
                      fill
                      unoptimized
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="mt-4">
                    <h2 className="font-semibold text-slate-800 text-sm sm:text-base line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {app.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">{app.companyName}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs font-semibold">
                    <FiDownload className="text-xs" strokeWidth={2.5} />
                    <span>{app.downloads}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-500 text-xs font-semibold">
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