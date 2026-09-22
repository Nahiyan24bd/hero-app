'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiDownload } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

interface AppItem {
  id: number;
  title: string;
  image: string;
  companyName: string;
  downloads: string;
  ratingAvg: number;
}

const TrendingApps = () => {
  const [apps, setApps] = useState<AppItem[]>([]);
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

  const visibleApps = apps.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight">
        Trending Apps
      </h2>
      <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
        Explore All Trending Apps on the Market developed by us
      </p>

      {/* 4-Column Cards Grid */}
      {loading ? (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse"
            >
              <div className="w-full aspect-square bg-slate-200 rounded-xl" />
              <div className="h-4 bg-slate-200 rounded mt-4 w-3/4" />
              <div className="h-3 bg-slate-200 rounded mt-2 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {visibleApps.map((app) => (
            <Link
              href={`/apps/${app.id}`}
              key={app.id}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-slate-100 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Preview Container */}
                <div className="w-full aspect-square rounded-xl bg-slate-100 overflow-hidden relative">
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title & Publisher */}
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {app.companyName}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="mt-5 flex items-center justify-between pt-1">
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

      {/* Show All Button */}
      <div className="mt-12">
        <Link
          href="/apps"
          className="inline-block px-8 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          Show All
        </Link>
      </div>
    </section>
  );
};

export default TrendingApps;