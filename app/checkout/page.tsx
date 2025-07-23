'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  restaurantName: string;
  notes?: string;
}

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    tableNumber: '',
    specialInstructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const router = useRouter();

  useEffect(() => {
    // Load cart from localStorage
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

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity === 0) {
      const newCart = cart.filter(item => item.dishId !== dishId);
      setCart(newCart);
      if (typeof window !== 'undefined') {
        localStorage.setItem('foodCourtCart', JSON.stringify(newCart));
      }
    } else {
      const newCart = cart.map(item =>
        item.dishId === dishId 
          ? { ...item, quantity }
          : item
      );
      setCart(newCart);
      if (typeof window !== 'undefined') {
        localStorage.setItem('foodCourtCart', JSON.stringify(newCart));
      }
    }
  };

  const updateNotes = (dishId: string, notes: string) => {
    const newCart = cart.map(item =>
      item.dishId === dishId 
        ? { ...item, notes }
        : item
    );
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodCourtCart', JSON.stringify(newCart));
    }
  };

  const removeItem = (dishId: string) => {
    const newCart = cart.filter(item => item.dishId !== dishId);
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('foodCourtCart', JSON.stringify(newCart));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return getTotalPrice() > 1000 ? 0 : 100; // Free delivery over KSh 1000
  };

  const getFinalTotal = () => {
    return getTotalPrice() + getDeliveryFee();
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number!');
      return;
    }

    // Simulate order submission
    alert(`Order submitted successfully!\n\nOrder Summary:\n${cart.map(item => `${item.quantity}x ${item.name} from ${item.restaurantName}`).join('\n')}\n\nTotal: KSh ${getFinalTotal().toLocaleString()}\nPayment: ${paymentMethod.toUpperCase()}\n\nYour order will be ready in 15-20 minutes!`);
    
    // Clear cart
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('foodCourtCart');
    }
    
    // Redirect to home
    router.push('/');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Add some delicious items to your cart first!</p>
        <button
          onClick={() => router.push('/browse-cuisines')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>
        <p className="text-gray-600">Review your order and complete your purchase</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.dishId} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.restaurantName}</p>
                    <p className="text-sm text-green-600 font-semibold">
                      KSh {item.price.toLocaleString()} each
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.dishId)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => updateQuantity(item.dishId, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="mx-2 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.dishId, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300"
                  >
                    +
                  </button>
                  <span className="ml-auto font-semibold text-green-600">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
                
                <input
                  type="text"
                  placeholder="Special instructions for this item..."
                  value={item.notes || ''}
                  onChange={(e) => updateNotes(item.dishId, e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>KSh {getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className={getDeliveryFee() === 0 ? 'text-green-600' : ''}>
                {getDeliveryFee() === 0 ? 'FREE' : `KSh ${getDeliveryFee()}`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
              <span>Total:</span>
              <span className="text-green-600">KSh {getFinalTotal().toLocaleString()}</span>
            </div>
            {getDeliveryFee() === 0 && (
              <p className="text-sm text-green-600">🎉 You qualify for free delivery!</p>
            )}
          </div>
        </div>

        {/* Customer Information & Payment */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Customer Information</h2>
          
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+254 700 000 000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Table Number (if dining in)
              </label>
              <input
                type="text"
                value={customerInfo.tableNumber}
                onChange={(e) => setCustomerInfo({ ...customerInfo, tableNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Table 5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Instructions
              </label>
              <textarea
                value={customerInfo.specialInstructions}
                onChange={(e) => setCustomerInfo({ ...customerInfo, specialInstructions: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special requests or dietary requirements..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="mpesa"
                    checked={paymentMethod === 'mpesa'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>M-Pesa</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>Credit/Debit Card</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Place Order - KSh {getFinalTotal().toLocaleString()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}