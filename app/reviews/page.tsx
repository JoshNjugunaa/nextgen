'use client';

import { useState } from 'react';
import { reviews, restaurants } from '@/lib/data';

export default function Reviews() {
  const [newReview, setNewReview] = useState({
    customerName: '',
    outlet: '',
    rating: 5,
    comment: ''
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.customerName || !newReview.outlet || !newReview.comment) {
      alert('Please fill in all fields!');
      return;
    }

    alert(`Review submitted successfully!\n\nThank you for your feedback!\n\nNote: This is a demo - review was not actually saved.`);
    
    // Reset form
    setNewReview({
      customerName: '',
      outlet: '',
      rating: 5,
      comment: ''
    });
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
            className={`text-xl ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Customer Reviews</h1>
        <p className="text-gray-600">
          Share your experience and read what others are saying about our restaurants
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Write a Review</h2>
          
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={newReview.customerName}
                onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant *
              </label>
              <select
                value={newReview.outlet}
                onChange={(e) => setNewReview({ ...newReview, outlet: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value="">Choose a restaurant...</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.name}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating *
              </label>
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview({ ...newReview, rating })
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review *
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Tell us about your experience..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Reviews</h2>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{review.customerName}</h3>
                    <p className="text-sm text-gray-600">{review.outlet}</p>
                  </div>
                  <div className="text-right">
                    {renderStars(review.rating)}
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Love our food court?
        </h2>
        <p className="text-gray-600 mb-6">
          Share your experience on social media and help others discover great food!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Share on Facebook
          </button>
          <button className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-600 transition-colors">
            Share on Instagram
          </button>
          <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Share on X
          </button>
        </div>
      </div>
    </div>
  );
}