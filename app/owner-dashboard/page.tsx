'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { restaurants, tables, owners } from '@/lib/data';

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: 'preparing' | 'ready' | 'delivered';
  time: string;
  tableNumber?: string;
}

export default function OwnerDashboard() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  
  const [selectedOwnerId] = useState('1'); // Simulating logged in owner
  const [activeTab, setActiveTab] = useState(initialTab);
  const [newDish, setNewDish] = useState({ name: '', price: '', description: '' });
  const [priceUpdates, setPriceUpdates] = useState<{[key: string]: string}>({});
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', customer: 'John Doe', items: 'Grilled Chicken x2, Beef Kebabs x1', total: 3900, status: 'preparing', time: '10:30 AM', tableNumber: '5' },
    { id: '2', customer: 'Sarah Ahmed', items: 'Grilled Fish x1, Coconut Rice x2', total: 3000, status: 'ready', time: '10:15 AM', tableNumber: '3' },
    { id: '3', customer: 'Mike Johnson', items: 'Beef Kebabs x3', total: 4500, status: 'delivered', time: '9:45 AM', tableNumber: '7' },
    { id: '4', customer: 'Jane Smith', items: 'Grilled Chicken x1, Coconut Rice x1', total: 1800, status: 'preparing', time: '11:00 AM' },
  ]);
  
  const owner = owners.find(o => o.id === selectedOwnerId);
  const restaurant = restaurants.find(r => r.id === owner?.restaurantId);
  const ownerTables = tables.filter(t => t.ownerId === selectedOwnerId);
  const popularDishes = restaurant?.dishes.filter(d => d.isPopular) || [];

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!owner || !restaurant) {
    return <div>Owner not found</div>;
  }

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price || !newDish.description) {
      alert('Please fill in all fields!');
      return;
    }
    alert(`New dish added!\n\nName: ${newDish.name}\nPrice: KSh ${newDish.price}\nDescription: ${newDish.description}\n\nNote: This is a demo - dish not actually added.`);
    setNewDish({ name: '', price: '', description: '' });
  };

  const handleUpdatePrices = () => {
    const updates = Object.entries(priceUpdates).filter(([_, price]) => price !== '');
    if (updates.length === 0) {
      alert('No price updates to save!');
      return;
    }
    alert(`Price updates saved!\n\n${updates.map(([dishId, price]) => {
      const dish = restaurant.dishes.find(d => d.id === dishId);
      return `${dish?.name}: KSh ${price}`;
    }).join('\n')}\n\nNote: This is a demo - prices not actually updated.`);
    setPriceUpdates({});
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order deleted successfully!');
    }
  };

  const handleStatusChange = (orderId: string, newStatus: 'preparing' | 'ready' | 'delivered') => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order status updated to: ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'ready': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'delivered': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const toggleTableStatus = (tableId: string) => {
    const table = ownerTables.find(t => t.id === tableId);
    const newStatus = table?.status === 'available' ? 'reserved' : 'available';
    alert(`Table ${table?.number} status changed to: ${newStatus}\n\nNote: This is a demo - status not actually changed.`);
  };

  return (
    <div className="w-full px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Welcome back, {owner.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Managing {restaurant.name} - {restaurant.cuisine} Cuisine
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'orders', label: 'Order Management' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  KSh {owner.totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This month</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Tables Owned</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{ownerTables.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {ownerTables.filter(t => t.status === 'available').length} available
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Active Orders</h3>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {orders.filter(o => o.status !== 'delivered').length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pending completion</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Tables Management */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Your Tables</h2>
                <div className="grid grid-cols-4 gap-3">
                  {ownerTables.map((table) => (
                    <button
                      key={table.id}
                      onClick={() => toggleTableStatus(table.id)}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                        table.status === 'available'
                          ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                          : 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                      }`}
                    >
                      T{table.number}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Reserved</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Orders</h2>
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-gray-100">Order #{order.id}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer} - {order.time}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{order.items}</p>
                      <p className="font-semibold text-green-600 dark:text-green-400">KSh {order.total.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Sales Analytics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Today's Sales</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">KSh 15,400</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">This Week</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">KSh 89,200</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">This Month</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">KSh {owner.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Average Order Value</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">KSh 1,250</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Top Performing Dishes</h2>
              <div className="space-y-3">
                {restaurant.dishes.slice(0, 5).map((dish, index) => (
                  <div key={dish.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{dish.name}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{Math.floor(Math.random() * 50) + 10} orders</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Order Management Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Add New Dish */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Add New Dish</h2>
              <form onSubmit={handleAddDish} className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    value={newDish.name}
                    onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter dish name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price (KSh) *
                  </label>
                  <input
                    type="number"
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description *
                  </label>
                  <input
                    type="text"
                    value={newDish.description}
                    onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Describe the dish"
                    required
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    Add Dish
                  </button>
                </div>
              </form>
            </div>

            {/* Update Prices */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Update Menu Prices</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {restaurant.dishes.map((dish) => (
                  <div key={dish.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-100">{dish.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current: KSh {dish.price.toLocaleString()}</p>
                    </div>
                    <input
                      type="number"
                      placeholder="New price"
                      value={priceUpdates[dish.id] || ''}
                      onChange={(e) => setPriceUpdates({ ...priceUpdates, [dish.id]: e.target.value })}
                      className="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleUpdatePrices}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Update Prices
              </button>
            </div>

            {/* Orders Management */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Current Orders</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-100">Order #{order.id}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.customer} - {order.time}
                          {order.tableNumber && ` - Table ${order.tableNumber}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{order.items}</p>
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">KSh {order.total.toLocaleString()}</p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(order.id, 'preparing')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          order.status === 'preparing' 
                            ? 'bg-yellow-500 text-white' 
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        Preparing
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, 'ready')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          order.status === 'ready' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                        }`}
                      >
                        Ready
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, 'delivered')}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          order.status === 'delivered' 
                            ? 'bg-gray-500 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
                        }`}
                      >
                        Delivered
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}