'use client';

import Image from 'next/image';
import Link from 'next/link';
import { restaurants } from '@/lib/data';

export default function BrowseOutlets() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Restaurant Outlets</h1>
        <p className="text-gray-600">
          Choose from our selection of restaurant partners in the food court
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {restaurant.name}
              </h3>
              <p className="text-sm text-amber-600 font-medium mb-2">
                {restaurant.cuisine}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                {restaurant.description}
              </p>
              <Link 
                href={`/order?outlet=${restaurant.id}`}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors block text-center"
              >
                Order Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}