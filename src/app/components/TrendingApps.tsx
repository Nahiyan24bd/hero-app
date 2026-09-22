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
  description: string;
  size: number;
  reviews: string;
  ratingAvg: number;
  downloads: string;
}

export default function TrendingApps() {
  const [trendingApps, setTrendingApps] = useState<AppItem[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data: AppItem[]) => {
        setTrendingApps(data.slice(0, 8));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-full bg-[#f8fafc] dark:bg-[#0b0f19] py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trending Apps
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingApps.map((app) => (
            <Link
              href={`/apps/${app.id}`}
              key={app.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-full aspect-square rounded-xl bg-slate-50 dark:bg-slate-800/50 p-6 relative flex items-center justify-center">
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    unoptimized
                    className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm line-clamp-1">
                    {app.title}
                  </h3>
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

        <div className="mt-12 text-center">
          <Link
            href="/apps"
            className="inline-flex px-8 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95"
          >
            Show All
          </Link>
        </div>
      </div>
    </section>
  );
}