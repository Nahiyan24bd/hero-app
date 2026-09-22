'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AppNotFound({ onGoBack }: { onGoBack?: () => void }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Cat Illustration */}
      <div className="relative w-72 sm:w-80 md:w-96 aspect-square max-w-full">
        <Image
          src="/App-Error.png"
          alt="App Not Found"
          fill
          unoptimized
          className="object-contain"
          priority
        />
      </div>

      {/* Heading */}
      <h1 className="mt-8 text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-wide uppercase">
        OPPS!! APP NOT FOUND
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl">
        The App you are requesting is not found on our system. please try another apps
      </p>

      {/* Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={() => (onGoBack ? onGoBack() : router.back())}
          className="px-8 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          Go Back!
        </button>
      </div>
    </div>
  );
}