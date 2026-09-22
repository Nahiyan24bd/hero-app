'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash2, FiExternalLink, FiHardDrive, FiLayers, FiArrowRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

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

export default function InstallationPage() {
  const [installedApps, setInstalledApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadInstalledData = () => {
    const savedIds: number[] = JSON.parse(
      localStorage.getItem('installed_apps') || '[]'
    );

    fetch('/data.json')
      .then((res) => res.json())
      .then((data: AppItem[]) => {
        const filtered = data.filter((app) => savedIds.includes(app.id));
        setInstalledApps(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load apps:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadInstalledData();
  }, []);

const handleUninstall = (id: number) => {
  const target = installedApps.find((app) => app.id === id);
  const savedIds: number[] = JSON.parse(
    localStorage.getItem('installed_apps') || '[]'
  );
  const updated = savedIds.filter((savedId) => savedId !== id);
  localStorage.setItem('installed_apps', JSON.stringify(updated));
  setInstalledApps((prev) => prev.filter((app) => app.id !== id));

  if (target) {
    toast.warn(`${target.title} removed from installation list`);
  }
};

  const totalStorageSize = installedApps.reduce((acc, curr) => acc + (curr.size || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Installed Applications
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage your local installed application suite and disk usage.
            </p>
          </div>

          {/* Metrics summary */}
          <div className="flex items-center gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl px-5 py-3 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
                <FiLayers />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Total Apps</p>
                <p className="text-base font-bold text-slate-800">{installedApps.length}</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl px-5 py-3 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                <FiHardDrive />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Storage Used</p>
                <p className="text-base font-bold text-slate-800">{totalStorageSize} MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="mt-8 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs animate-pulse flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-40" />
                    <div className="h-3 bg-slate-200 rounded w-24" />
                  </div>
                </div>
                <div className="h-10 bg-slate-200 rounded w-28" />
              </div>
            ))}
          </div>
        ) : installedApps.length === 0 ? (
          <div className="mt-16 text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-xl mx-auto px-6">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4">
              <FiLayers />
            </div>
            <h2 className="text-xl font-bold text-slate-800">No Apps Installed Yet</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Explore the market catalogue and install your favorite tools to track them here.
            </p>
            <Link
              href="/apps"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
            >
              Browse Applications <FiArrowRight />
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {installedApps.map((app) => (
              <div
                key={app.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 hover:border-slate-200 shadow-xs transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-50 p-2.5 relative flex items-center justify-center shrink-0 border border-slate-100">
                    <Image
                      src={app.image}
                      alt={app.title}
                      fill
                      unoptimized
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">{app.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{app.companyName}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1 text-amber-500 font-semibold">
                        <FaStar className="text-[10px]" /> {app.ratingAvg.toFixed(1)}
                      </span>
                      <span>•</span>
                      <span>{app.size} MB</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Link
                    href={`/apps/${app.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Details <FiExternalLink />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleUninstall(app.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                  >
                    <FiTrash2 /> Uninstall
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}