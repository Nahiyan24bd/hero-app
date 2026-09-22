import React from 'react';
import Hero from './components/Hero';
import Stats from './components/Stats';
import TrendingApps from './components/TrendingApps';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Hero />
      <Stats />
      <TrendingApps />
    </main>
  );
}