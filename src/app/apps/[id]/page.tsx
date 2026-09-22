'use client';

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiDownload, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import AppNotFound from '@/app/components/AppNotFound';
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

export default function AppDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const appId = parseInt(resolvedParams.id, 10);
  const router = useRouter();

  const [app, setApp] = useState<AppItem | null>(null);
  const [similarApps, setSimilarApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data: AppItem[]) => {
        const found = data.find((item) => item.id === appId);
        setApp(found || null);

        if (found) {
          // Check localStorage installation status
          const saved: number[] = JSON.parse(
            localStorage.getItem('installed_apps') || '[]'
          );
          setIsInstalled(saved.includes(found.id));

          // Load up to 4 other apps
          const others = data.filter((item) => item.id !== found.id).slice(0, 4);
          setSimilarApps(others);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load app data:', err);
        setLoading(false);
      });
  }, [appId]);

const handleInstallToggle = () => {
  if (!app) return;
  const saved: number[] = JSON.parse(
    localStorage.getItem('installed_apps') || '[]'
  );
  let updated: number[];

  if (isInstalled) {
    updated = saved.filter((id) => id !== app.id);
    setIsInstalled(false);
    toast.info(`${app.title} uninstalled from collection`);
  } else {
    updated = [...saved, app.id];
    setIsInstalled(true);
    toast.success(`${app.title} installed successfully!`);
  }
  localStorage.setItem('installed_apps', JSON.stringify(updated));
};

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 max-w-5xl mx-auto animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-32 mb-8" />
        <div className="bg-white p-8 rounded-3xl border border-slate-100 flex gap-6">
          <div className="w-32 h-32 bg-slate-200 rounded-2xl" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-200 rounded w-1/4" />
            <div className="h-10 bg-slate-200 rounded w-40 mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!app) {
    return <AppNotFound onGoBack={() => router.push('/apps')} />;
  }

  // Calculate highest count for proportional progress bars
  const maxRatingCount = Math.max(
    ...(app.ratings?.map((r) => r.count) || [1])
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/apps"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-purple-600 transition-colors mb-6"
        >
          <FiArrowLeft className="text-base" /> Back to Apps
        </Link>

        {/* Hero Card Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-slate-50 border border-slate-100 relative p-4 flex items-center justify-center shrink-0">
            <Image
              src={app.image}
              alt={app.title}
              fill
              unoptimized
              className="object-contain p-4"
              priority
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {app.title}
            </h1>
            <p className="text-sm font-medium text-purple-600 mt-1">
              {app.companyName}
            </p>

            {/* Quick Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600">
                <FaStar className="text-xs" />
                <span>{app.ratingAvg.toFixed(1)} Rating</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                <FiDownload className="text-xs stroke-[2.5]" />
                <span>{app.downloads} Downloads</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600">
                {app.size} MB
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                type="button"
                onClick={handleInstallToggle}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-sm ${
                  isInstalled
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-purple-200 hover:shadow-md'
                }`}
              >
                {isInstalled ? (
                  <>
                    <FiCheck className="text-base" strokeWidth={3} /> Installed
                  </>
                ) : (
                  'Install App'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Description & Rating Breakdown */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Description */}
          <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
              About This App
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {app.description}
            </p>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
                Ratings & Reviews
              </h2>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-slate-900">
                  {app.ratingAvg.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  / 5.0 ({app.reviews} reviews)
                </span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2">
                {app.ratings?.slice().reverse().map((r) => {
                  const percentage = Math.round((r.count / maxRatingCount) * 100);
                  return (
                    <div key={r.name} className="flex items-center gap-3 text-xs">
                      <span className="w-12 text-slate-500 font-medium">
                        {r.name}
                      </span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Apps */}
        {similarApps.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Similar Applications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarApps.map((item) => (
                <Link
                  href={`/apps/${item.id}`}
                  key={item.id}
                  className="group bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full aspect-square rounded-xl bg-slate-50 p-6 relative flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-800 text-sm line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.companyName}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}