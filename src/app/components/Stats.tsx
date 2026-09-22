import React from 'react';

const statsData = [
  {
    title: 'Total Downloads',
    count: '29.6M',
    change: '21% More Than Last Month',
  },
  {
    title: 'Total Reviews',
    count: '906K',
    change: '46% More Than Last Month',
  },
  {
    title: 'Active Apps',
    count: '132+',
    change: '31 More Will Launch',
  },
];

const Stats = () => {
  return (
    <section className="relative w-full bg-[#6d28d9] text-white pt-20 sm:pt-25 md:pt-30 pb-20 z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Trusted By Millions, Built For You
        </h2>

        {/* 3 Metrics */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-center">
          {statsData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs sm:text-sm font-medium text-purple-200 tracking-wide">
                {item.title}
              </span>
              <span className="mt-2 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                {item.count}
              </span>
              <span className="mt-3 text-xs sm:text-sm font-medium text-purple-200">
                {item.change}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stats;