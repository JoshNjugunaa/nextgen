'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Moon, Sun, ShoppingCart } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Owner navigation items
  const ownerNavItems = [
    { href: '/owner-dashboard', label: 'Overview' },
    { href: '/owner-dashboard?tab=analytics', label: 'Analytics' },
    { href: '/owner-dashboard?tab=orders', label: 'Order Management' },
  ];

  // User navigation items
  const userNavItems = [
    { href: '/', label: 'Home' },
    { href: '/order', label: 'Orders' },
    { href: '/reservations', label: 'Reservations' },
    { href: '/checkout', label: 'Checkout' },
  ];

  useEffect(() => {
    // Check if user is logged in (only runs on client-side)
    if (typeof window !== 'undefined') {
      const userType = localStorage.getItem('userType');
      const storedUserName = localStorage.getItem('userName');
      const darkMode = localStorage.getItem('darkMode') === 'true';
      
      setIsOwnerLoggedIn(userType === 'owner');
      setIsLoggedIn(!!userType);
      setUserName(storedUserName || '');
      setIsDarkMode(darkMode);
      
      // Update cart count
      updateCartCount();
      
      // Apply dark mode
      if (darkMode) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const updateCartCount = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('foodCourtCart');
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
          setCartCount(totalItems);
        } catch (error) {
          setCartCount(0);
        }
      }
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userType');
      localStorage.removeItem('userName');
      localStorage.removeItem('foodCourtCart');
    }
    setIsLoggedIn(false);
    setIsOwnerLoggedIn(false);
    setUserName('');
    setCartCount(0);
    window.location.href = '/';
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newDarkMode.toString());
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // Listen for cart updates
  useEffect(() => {
    const handleStorageChange = () => {
      updateCartCount();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      // Custom event for same-page cart updates
      window.addEventListener('cartUpdated', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('cartUpdated', handleStorageChange);
      };
    }
  }, []);

  const navItems = isOwnerLoggedIn ? ownerNavItems : userNavItems;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="w-full px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            NextGen Mall Food Court
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
                  pathname === item.href || (item.href.includes('?tab=') && pathname === '/owner-dashboard')
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Cart Icon for Users */}
            {!isOwnerLoggedIn && (
              <Link
                href="/checkout"
                className="relative text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {!isLoggedIn ? (
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors hover:text-amber-600 dark:hover:text-amber-400 ${
                  pathname === '/login' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hey, {userName}!
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Cart Icon for Mobile Users */}
            {!isOwnerLoggedIn && (
              <Link
                href="/checkout"
                className="relative text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors p-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Dark Mode Toggle Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <select
              onChange={(e) => window.location.href = e.target.value}
              value={pathname}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
              {!isLoggedIn && (
                <option value="/login">Login</option>
              )}
            </select>
            
            {isLoggedIn && (
              <div className="text-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 block">Hey, {userName}!</span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 mt-1"
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