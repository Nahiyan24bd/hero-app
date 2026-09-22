'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiDownload, FiSearch } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

interface AppItem {
  id: number;
  title: string;
  image: string;
  companyName: string;
  downloads: string;
  ratingAvg: number;
}

export default function AppsPage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

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
    return apps.filter((app) =>
      app.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [apps, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Our All Applications
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-500">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>

      {/* Top Bar */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-bold text-slate-800 text-base sm:text-lg">
          ({filteredApps.length}) Apps Found
        </span>

        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            placeholder="Search Apps"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500 transition-all text-slate-800"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 animate-pulse">
              <div className="w-full aspect-square bg-slate-200 rounded-xl" />
              <div className="h-4 bg-slate-200 rounded mt-4 w-3/4" />
            </div>
          ))}
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">
            No applications found matching &quot;{searchQuery}&quot;.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredApps.map((app) => (
            <Link
              href={`/apps/${app.id}`}
              key={app.id}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-slate-100 transition-all flex flex-col justify-between"
            >
              <div className="w-full aspect-square rounded-xl bg-slate-100 overflow-hidden relative">
                <Image
                  src={app.image}
                  alt={app.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800 text-sm sm:text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">
                {app.title}
              </h3>

              <div className="mt-4 flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ecfdf5] text-[#10b981] text-xs font-semibold">
                  <FiDownload className="text-xs stroke-[2.5]" />
                  <span>{app.downloads}</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#fffbeb] text-[#f59e0b] text-xs font-semibold">
                  <FaStar className="text-xs" />
                  <span>{app.ratingAvg ? app.ratingAvg.toFixed(1) : '5.0'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}