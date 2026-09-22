'use client';

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { FiDownload } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';
import { toast } from 'react-toastify';
import AppNotFound from '@/app/components/AppNotFound';

interface RatingDistribution {
  name: string;
  count: number;
}

interface AppDetails {
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

export default function AppDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [app, setApp] = useState<AppDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch('/data.json')
      .then((res) => res.json())
      .then((data: AppDetails[]) => {
        if (!isMounted) return;
        const found = data.find((item) => String(item.id) === resolvedParams.id);
        setApp(found || null);
        setLoading(false);

        // Check localStorage safely after data load
        const stored = localStorage.getItem('installedApps');
        if (stored) {
          try {
            const parsed: AppDetails[] = JSON.parse(stored);
            if (parsed.some((item) => String(item.id) === resolvedParams.id)) {
              setIsInstalled(true);
            }
          } catch (e) {
            console.error(e);
          }
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [resolvedParams.id]);

  const handleInstall = () => {
    if (!app) return;

    const stored = localStorage.getItem('installedApps');
    const installedList: AppDetails[] = stored ? JSON.parse(stored) : [];

    const alreadyInstalled = installedList.some((item) => item.id === app.id);

    if (alreadyInstalled) {
      toast.info(`${app.title} is already installed!`);
      return;
    }

    const updatedList = [...installedList, app];
    localStorage.setItem('installedApps', JSON.stringify(updatedList));
    setIsInstalled(true);
    toast.success(`${app.title} installed successfully!`);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center text-slate-500">
        Loading details...
      </div>
    );
  }

  if (!app) {
    return <AppNotFound />;
  }

  const ratingList = app.ratings ? [...app.ratings].reverse() : [];
  const maxCount = Math.max(...(ratingList.map((r) => r.count) || [1]));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
        
        <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm shrink-0 relative overflow-hidden flex items-center justify-center">
          <Image
            src={app.image}
            alt={app.title}
            fill
            unoptimized
            className="object-contain p-2 rounded-xl"
          />
        </div>

        <div className="flex-1 text-center sm:text-left w-full">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {app.title}
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Developed by{' '}
            <span className="text-[#6366f1] font-semibold">
              {app.companyName || 'productive.io'}
            </span>
          </p>

          <div className="my-6 border-b border-slate-200/70" />

          <div className="flex items-center justify-center sm:justify-start gap-10 sm:gap-14">
            <div className="flex flex-col items-center sm:items-start">
              <FiDownload className="text-[#00c988] text-2xl stroke-[2.5]" />
              <span className="mt-1 text-[11px] font-semibold text-slate-400">
                Downloads
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {app.downloads}
              </span>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <FaStar className="text-[#f59e0b] text-2xl" />
              <span className="mt-1 text-[11px] font-semibold text-slate-400">
                Average Ratings
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {app.ratingAvg ? app.ratingAvg.toFixed(1) : '4.9'}
              </span>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <BiSolidLike className="text-[#6366f1] text-2xl" />
              <span className="mt-1 text-[11px] font-semibold text-slate-400">
                Total Reviews
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {app.reviews}
              </span>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleInstall}
              disabled={isInstalled}
              className={`px-7 py-3 rounded-lg font-semibold text-sm transition-all shadow-sm active:scale-95 text-white ${
                isInstalled
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-[#00c988] hover:bg-[#00b077]'
              }`}
            >
              {isInstalled ? 'Installed' : `Install Now (${app.size} MB)`}
            </button>
          </div>
        </div>
      </div>

      <div className="my-12 border-b border-slate-200/80" />

      <div className="mb-14">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Ratings</h2>
        <div className="flex flex-col gap-3 max-w-4xl">
          {ratingList.map((item) => {
            const percentage = Math.max(6, Math.round((item.count / maxCount) * 100));
            return (
              <div key={item.name} className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className="w-12 text-slate-600 text-right">{item.name}</span>
                <div className="flex-1 h-6 bg-transparent rounded">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="h-full bg-[#f97316] rounded-sm transition-all duration-500"
                  />
                </div>
              </div>
            );
          })}
          <div className="flex justify-between text-[11px] text-slate-400 pl-16 pt-2">
            <span>0</span>
            <span>3000</span>
            <span>6000</span>
            <span>9000</span>
            <span>12000</span>
          </div>
        </div>
      </div>

      <div className="my-10 border-b border-slate-200/80" />

      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Description</h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {app.description}
        </p>
      </div>
    </div>
  );
}