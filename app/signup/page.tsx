'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'user'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert('Please fill in all required fields!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    if (formData.userType === 'owner') {
      // Redirect to owner dashboard
      if (typeof window !== 'undefined') {
        localStorage.setItem('userType', 'owner');
        localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
      }
      window.location.href = '/owner-dashboard';
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userType', 'customer');
        localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
      }
      alert(`User account created for: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nNote: This is a demo - no actual account is created.`);
    }
  };

  return (
    <div className="min-h-screen flex max-w-full">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Food Court"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">NextGen Mall Food Court</h1>
            <p className="text-xl">Join our community of food lovers and restaurant owners</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join us to start ordering and reserving tables</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'user' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.userType === 'user' 
                      ? 'border-amber-500 bg-amber-50 text-amber-700' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">Customer</div>
                  <div className="text-sm text-gray-600">Order food & reserve tables</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'owner' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.userType === 'owner' 
                      ? 'border-amber-500 bg-amber-50 text-amber-700' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">Restaurant Owner</div>
                  <div className="text-sm text-gray-600">Manage your restaurant</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="+254 700 000 000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Minimum 6 characters"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Repeat your password"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                required
              />
              <label className="ml-2 block text-sm text-gray-700">
                I agree to the <button type="button" className="text-amber-600 hover:text-amber-500">Terms of Service</button> and <button type="button" className="text-amber-600 hover:text-amber-500">Privacy Policy</button>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 px-4 rounded-md hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Create {formData.userType === 'owner' ? 'Owner' : 'Customer'} Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-600 hover:text-amber-500 font-medium">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              ⚠️ This is a demo application. No actual account is created.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}