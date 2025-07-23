'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/browse-outlets', label: 'Outlets' },
    { href: '/browse-cuisines', label: 'Cuisines' },
    { href: '/popular-dishes', label: 'Popular' },
    { href: '/order', label: 'Order' },
    { href: '/reservations', label: 'Tables' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/checkout', label: 'Checkout' },
  ];

  useEffect(() => {
    // Check if user is logged in as owner (only runs on client-side)
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('userType');
      const storedUserName = localStorage.getItem('userName');
      setIsOwnerLoggedIn(userType === 'owner');
      setIsLoggedIn(!!userType);
      setUserName(storedUserName || '');
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userType');
      localStorage.removeItem('userName');
      localStorage.removeItem('foodCourtCart');
    }
    setIsLoggedIn(false);
    setIsOwnerLoggedIn(false);
    setUserName('');
    window.location.href = '/';
  };
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            NextGen Mall Food Court
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  pathname === item.href ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
            {isOwnerLoggedIn && (
              <Link
                href="/owner-dashboard"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === '/owner-dashboard' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                Owner Dashboard
              </Link>
            )}
            {!isLoggedIn ? (
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  pathname === '/login' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Hey, {userName}!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <select
              onChange={(e) => window.location.href = e.target.value}
              value={pathname}
              className="text-sm border border-gray-300 rounded-md px-2 py-1"
            >
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
              {isOwnerLoggedIn && (
                <option value="/owner-dashboard">Owner Dashboard</option>
              )}
              {!isLoggedIn && (
                <option value="/login">Login</option>
              )}
            </select>
            {isLoggedIn && (
              <div className="mt-2 text-center">
                <span className="text-xs text-gray-600">Hey, {userName}!</span>
                <button
                  onClick={handleLogout}
                  className="block w-full mt-1 text-xs text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}