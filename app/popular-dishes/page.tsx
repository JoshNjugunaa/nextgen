'use client';

import { popularDishes } from '@/lib/data';

export default function PopularDishes() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Popular Dishes</h1>
        <p className="text-gray-600">
          These are the most ordered dishes across all our restaurant outlets
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularDishes.map((dish, index) => (
          <div key={dish.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {dish.name}
              </h3>
              <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                #{index + 1}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              From {dish.outlet}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-green-600">
                KSh {dish.price.toLocaleString()}
              </span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
                Order This
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Want to see the full menu?
        </h2>
        <p className="text-gray-600 mb-6">
          Browse all our restaurants to discover more amazing dishes
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/browse-outlets"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Browse All Outlets
          </a>
          <a 
            href="/browse-cuisines"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Browse by Cuisine
          </a>
        </div>
      </div>
    </div>
  );
}