import Hero from '@/app/components/Hero';
import Stats from './components/Stats';
import TrendingApps from './components/TrendingApps';


export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
     
      <Hero />
      <Stats />
      <TrendingApps />
      
    </main>
  );
}