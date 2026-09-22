'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* 404 Illustration */}
      <div className="relative w-80 sm:w-96 md:w-105 aspect-4/3 max-w-full">
        <Image
          src="/error-404.png"
          alt="404 Not Found"
          fill
          unoptimized
          className="object-contain"
          priority
        />
      </div>

      <h1 className="mt-8 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
        Oops, page not found!
      </h1>

      <p className="mt-2.5 text-sm sm:text-base text-slate-500 max-w-md">
        The page you are looking for is not available.
      </p>

      <div className="mt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          Go Back!
        </button>
      </div>
    </div>
  );
}