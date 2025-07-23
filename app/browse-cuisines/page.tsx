'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { restaurants, cuisines } from '@/lib/data';

interface CartItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  restaurantName: string;
}

export default function BrowseCuisines() {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCuisine = selectedCuisine === '' || restaurant.cuisine === selectedCuisine;
    const matchesSearch = searchTerm === '' || 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCuisine && matchesSearch;
  });

  const restaurantsForCuisine = selectedCuisine 
    ? restaurants.filter(r => r.cuisine === selectedCuisine)
    : [];

  const selectedRestaurantData = restaurants.find(r => r.id === selectedRestaurant);

  const addToCart = (dishId: string, name: string, price: number, restaurantName: string) => {
    const existingItem = cart.find(item => item.dishId === dishId);
    
    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.dishId === dishId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, {
        dishId,
        name,
        price,
        quantity: 1,
        restaurantName
      }];
    }
    
    setCart(newCart);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodCourtCart', JSON.stringify(newCart));
    }
  };

  const updateCartQuantity = (dishId: string, quantity: number) => {
    let newCart;
    if (quantity === 0) {
      newCart = cart.filter(item => item.dishId !== dishId);
    } else {
      newCart = cart.map(item =>
        item.dishId === dishId 
          ? { ...item, quantity }
          : item
      );
    }
    
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodCourtCart', JSON.stringify(newCart));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Please add items to your cart first!');
      return;
    }
    // Redirect to checkout page
    window.location.href = '/checkout';
  };

  // Load cart from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('foodCourtCart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error parsing cart data:', error);
          localStorage.removeItem('foodCourtCart');
        }
      }
    }
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Browse by Cuisine</h1>
        <p className="text-gray-600 mb-6">
          Find restaurants by cuisine type or search by name
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={selectedCuisine}
            onChange={(e) => {
              setSelectedCuisine(e.target.value);
              setSelectedRestaurant('');
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine.name} value={cuisine.name}>
                {cuisine.name}
              </option>
            ))}
          </select>

          {cart.length > 0 && (
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors relative"
            >
              Cart ({cart.length})
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Cuisine Categories */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cuisine Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine.name}
              onClick={() => {
                setSelectedCuisine(selectedCuisine === cuisine.name ? '' : cuisine.name);
                setSelectedRestaurant('');
              }}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all ${
                selectedCuisine === cuisine.name ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="relative h-24 w-full">
                <Image
                  src={cuisine.image}
                  alt={cuisine.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <p className="text-sm font-medium text-gray-800 text-center">
                  {cuisine.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant Selection for Selected Cuisine */}
      {selectedCuisine && restaurantsForCuisine.length > 1 && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Choose {selectedCuisine} Restaurant
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurantsForCuisine.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => setSelectedRestaurant(restaurant.id)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  selectedRestaurant === restaurant.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-semibold text-gray-800">{restaurant.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{restaurant.description}</p>
                <p className="text-sm text-blue-600 mt-2">{restaurant.dishes.length} dishes available</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu Display */}
      {selectedCuisine && (selectedRestaurant || restaurantsForCuisine.length === 1) && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Menu - {selectedRestaurantData?.name || restaurantsForCuisine[0]?.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(selectedRestaurantData?.dishes || restaurantsForCuisine[0]?.dishes || []).map((dish) => (
              <div key={dish.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800">{dish.name}</h4>
                  {dish.isPopular && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{dish.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-green-600">
                    KSh {dish.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => addToCart(
                      dish.id, 
                      dish.name, 
                      dish.price, 
                      selectedRestaurantData?.name || restaurantsForCuisine[0]?.name || ''
                    )}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Restaurants Grid (when no cuisine selected) */}
      {!selectedCuisine && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
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
                <p className="text-sm text-blue-600 font-medium mb-2">
                  {restaurant.cuisine}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {restaurant.description}
                </p>
                <button
                  onClick={() => {
                    setSelectedCuisine(restaurant.cuisine);
                    setSelectedRestaurant(restaurant.id);
                  }}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  View Menu
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.dishId} className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.restaurantName}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.dishId, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="mx-2 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.dishId, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-semibold text-green-600">
                          KSh {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold mb-4">
                      <span>Total:</span>
                      <span className="text-green-600">KSh {getTotalPrice().toLocaleString()}</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {filteredRestaurants.length === 0 && !selectedCuisine && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}