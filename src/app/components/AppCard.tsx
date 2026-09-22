import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiDownload } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

export interface AppCardProps {
  id?: number | string;
  title: string;
  image?: string;
  downloads: string;
  rating: string | number;
  href?: string;
}

const AppCard: React.FC<AppCardProps> = ({
  id,
  title,
  image,
  downloads,
  rating,
  href,
}) => {
  const content = (
    <div className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-slate-100/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      {/* Thumbnail Area */}
      <div className="w-full aspect-square rounded-xl bg-[#d5d8de] overflow-hidden relative flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-[#d5d8de]" />
        )}
      </div>

      {/* App Title */}
      <h3 className="mt-3.5 text-sm sm:text-base font-semibold text-[#0f172a] line-clamp-1 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>

      {/* Bottom Badges */}
      <div className="mt-3.5 flex items-center justify-between">
        {/* Downloads Pill */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eafaf1] text-[#10b981] text-xs font-semibold">
          <FiDownload className="text-xs stroke-[2.5]" />
          <span>{downloads}</span>
        </div>

        {/* Rating Pill */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#fff7ed] text-[#f97316] text-xs font-bold">
          <FaStar className="text-xs text-[#f97316]" />
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );

  if (href || id) {
    return (
      <Link href={href || `/apps/${id}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

export default AppCard;