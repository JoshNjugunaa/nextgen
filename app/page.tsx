'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section with Background */}
      <div className="relative h-96 mb-16 rounded-lg overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Food Court"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to NextGen Mall Food Court
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Discover amazing cuisines from multiple restaurants all in one place. 
              Reserve your table in advance and order from your favorite outlets 
              while enjoying our comfortable shared seating experience.
            </p>
          </div>
        </div>
      </div>

      {/* Browse by Outlet Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse by Outlet</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore all our restaurant partners and discover what each outlet has to offer
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Tamu Tamu Grills"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Tamu Tamu Grills</h3>
              <p className="text-sm text-amber-600 font-medium">BBQ Cuisine</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image
                src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Swahili Plates"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Swahili Plates</h3>
              <p className="text-sm text-amber-600 font-medium">Coastal Cuisine</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Burger Bros"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Burger Bros</h3>
              <p className="text-sm text-amber-600 font-medium">Fast Food</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full">
              <Image
                src="https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sushi Spot"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Sushi Spot</h3>
              <p className="text-sm text-amber-600 font-medium">Japanese Cuisine</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/browse-outlets"
            className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            View All Outlets
          </Link>
        </div>
      </div>

      {/* Browse by Cuisines Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse by Cuisines</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover restaurants by your favorite cuisine type and find exactly what you're craving
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-24 w-full">
              <Image
                src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Coastal Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-gray-800 text-center">Coastal</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-24 w-full">
              <Image
                src="https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Indian Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-gray-800 text-center">Indian</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-24 w-full">
              <Image
                src="https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Chinese Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-gray-800 text-center">Chinese</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-24 w-full">
              <Image
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Fast Food"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-gray-800 text-center">Fast Food</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-24 w-full">
              <Image
                src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Vegan Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-gray-800 text-center">Vegan</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-24 w-full">
              <Image
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="BBQ Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-gray-800 text-center">BBQ</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-24 w-full">
              <Image
                src="https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Japanese Cuisine"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-gray-800 text-center">Japanese</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/browse-cuisines"
            className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Explore All Cuisines
          </Link>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/popular-dishes" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Popular Dishes</h3>
          <p className="text-gray-600">See what everyone's ordering today</p>
        </Link>
        
        <Link href="/reservations" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Reserve Table</h3>
          <p className="text-gray-600">Book your spot in advance</p>
        </Link>
        
        <Link href="/reviews" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Reviews</h3>
          <p className="text-gray-600">Read what others are saying</p>
        </Link>
      </div>
    </div>
  );
}