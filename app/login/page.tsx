'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields!');
      return;
    }

    // Simple demo login - check if it's an owner email
    if (formData.email.includes('owner') || formData.email.includes('@tamugrills.com') || formData.email.includes('@swahiliplates.com')) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userType', 'owner');
        localStorage.setItem('userName', 'Restaurant Owner');
      }
      window.location.href = '/owner-dashboard';
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userType', 'customer');
        localStorage.setItem('userName', 'Customer');
      }
      alert(`Login successful!\n\nNote: This is a demo - no actual authentication is implemented.`);
    }
  };

  return (
    <div className="max-w-md mx-auto max-w-7xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button type="button" className="text-sm text-amber-600 hover:text-amber-500">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-amber-600 hover:text-amber-500 font-medium">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-4">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          ⚠️ This is a demo application. No actual authentication is implemented.
        </p>
      </div>
    </div>
  );
}