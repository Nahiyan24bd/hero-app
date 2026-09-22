'use client';

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiDownload, FiArrowLeft, FiCheck, FiShare2, FiHeart } from 'react-icons/fi';
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

interface UserReview {
  stars: number;
  comment: string;
  date: string;
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
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Review states
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data: AppItem[]) => {
        const found = data.find((item) => item.id === appId);
        setApp(found || null);

        if (found) {
          // Check installation status
          const installedSaved: number[] = JSON.parse(
            localStorage.getItem('installed_apps') || '[]'
          );
          setIsInstalled(installedSaved.includes(found.id));

          // Check wishlist status
          const wishlistSaved: number[] = JSON.parse(
            localStorage.getItem('wishlist_apps') || '[]'
          );
          setIsWishlisted(wishlistSaved.includes(found.id));

          // Load 4 similar apps
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

  const handleWishlistToggle = () => {
    if (!app) return;
    const saved: number[] = JSON.parse(
      localStorage.getItem('wishlist_apps') || '[]'
    );
    let updated: number[];

    if (isWishlisted) {
      updated = saved.filter((id) => id !== app.id);
      setIsWishlisted(false);
      toast.info(`${app.title} removed from wishlist`);
    } else {
      updated = [...saved, app.id];
      setIsWishlisted(true);
      toast.success(`${app.title} added to wishlist!`);
    }
    localStorage.setItem('wishlist_apps', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const handleShare = async () => {
    if (!app) return;
    const appUrl = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: app.title,
          text: `Check out ${app.title} on HERO.IO!`,
          url: appUrl,
        });
      } catch {
        // User aborted share
      }
    } else {
      navigator.clipboard.writeText(appUrl);
      toast.success('App link copied to clipboard!');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) {
      toast.error('Please write a short review before submitting.');
      return;
    }

    setSubmittedReviews([
      {
        stars: userRating,
        comment: userComment.trim(),
        date: 'Just now',
      },
      ...submittedReviews,
    ]);
    setUserComment('');
    toast.success('Thank you! Your review has been published.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 max-w-5xl mx-auto animate-pulse">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-32 mb-8" />
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 flex gap-6">
          <div className="w-32 h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded w-40 mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (!app) {
    return <AppNotFound onGoBack={() => router.push('/apps')} />;
  }

  const maxRatingCount = Math.max(
    ...(app.ratings?.map((r) => r.count) || [1])
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Bar Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors"
          >
            <FiArrowLeft className="text-base" /> Back to Apps
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWishlistToggle}
              className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-all ${
                isWishlisted
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-200'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-rose-500'
              }`}
              title="Add to Wishlist"
            >
              <FiHeart className={`text-lg ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 transition-colors"
              title="Share App"
            >
              <FiShare2 className="text-lg" />
            </button>
          </div>
        </div>

        {/* Hero Card Header */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 relative p-4 flex items-center justify-center shrink-0">
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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {app.title}
            </h1>
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mt-1">
              {app.companyName}
            </p>

            {/* Quick Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <FaStar className="text-xs" />
                <span>{app.ratingAvg.toFixed(1)} Rating</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <FiDownload className="text-xs stroke-[2.5]" />
                <span>{app.downloads} Downloads</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
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
                    : 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-purple-200 dark:shadow-none hover:shadow-md'
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
          <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              About This App
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {app.description}
            </p>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                Ratings & Reviews
              </h2>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
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
                      <span className="w-12 text-slate-500 dark:text-slate-400 font-medium">
                        {r.name}
                      </span>
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
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

        {/* Feature 2: Interactive User Review & Rating Form */}
        <div className="mt-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Leave a Review
          </h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Your Rating:
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setUserRating(star)}
                    className="text-lg text-amber-400 transition-transform active:scale-125 focus:outline-none"
                  >
                    <FaStar
                      className={
                        star <= userRating
                          ? 'text-amber-400'
                          : 'text-slate-200 dark:text-slate-700'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              placeholder="What do you think about this application? Share your feedback..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-600 transition-colors"
            />

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95"
            >
              Submit Review
            </button>
          </form>

          {/* Published Reviews Stream */}
          {submittedReviews.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Recent Community Reviews:
              </h4>
              {submittedReviews.map((rev, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(rev.stars)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <span>{rev.date}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar Apps */}
        {similarApps.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Similar Applications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarApps.map((item) => (
                <Link
                  href={`/apps/${item.id}`}
                  key={item.id}
                  className="group bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 hover:shadow-md dark:hover:border-purple-900/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full aspect-square rounded-xl bg-slate-50 dark:bg-slate-800/50 p-6 relative flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        unoptimized
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-800 dark:text-slate-100 text-sm line-clamp-1 group-hover:text-purple-600 transition-colors">
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