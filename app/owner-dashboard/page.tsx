'use client';

import { useState } from 'react';
import { restaurants, tables, owners } from '@/lib/data';

export default function OwnerDashboard() {
  const [selectedOwnerId] = useState('1'); // Simulating logged in owner
  const [activeTab, setActiveTab] = useState('overview');
  const [newDish, setNewDish] = useState({ name: '', price: '', description: '' });
  const [priceUpdates, setPriceUpdates] = useState<{[key: string]: string}>({});
  const [reservationForm, setReservationForm] = useState({
    tableId: '',
    customerName: '',
    customerPhone: '',
    date: '',
    time: ''
  });
  
  const owner = owners.find(o => o.id === selectedOwnerId);
  const restaurant = restaurants.find(r => r.id === owner?.restaurantId);
  const ownerTables = tables.filter(t => t.ownerId === selectedOwnerId);
  const popularDishes = restaurant?.dishes.filter(d => d.isPopular) || [];

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

  const handleReserveTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationForm.tableId || !reservationForm.customerName || !reservationForm.customerPhone) {
      alert('Please fill in all required fields!');
      return;
    }
    const table = ownerTables.find(t => t.id === reservationForm.tableId);
    alert(`Table reserved!\n\nTable: ${table?.number}\nCustomer: ${reservationForm.customerName}\nPhone: ${reservationForm.customerPhone}\nDate: ${reservationForm.date}\nTime: ${reservationForm.time}\n\nNote: This is a demo - reservation not actually made.`);
    setReservationForm({ tableId: '', customerName: '', customerPhone: '', date: '', time: '' });
  };

  const toggleTableStatus = (tableId: string) => {
    const table = ownerTables.find(t => t.id === tableId);
    const newStatus = table?.status === 'available' ? 'reserved' : 'available';
    alert(`Table ${table?.number} status changed to: ${newStatus}\n\nNote: This is a demo - status not actually changed.`);
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {owner.name}
        </h1>
        <p className="text-gray-600">
          Managing {restaurant.name} - {restaurant.cuisine} Cuisine
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'dishes', label: 'Manage Dishes' },
              { id: 'tables', label: 'Table Management' },
              { id: 'orders', label: 'Orders' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">
            KSh {owner.totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tables Owned</h3>
          <p className="text-3xl font-bold text-blue-600">{ownerTables.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {ownerTables.filter(t => t.status === 'available').length} available
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Popular Dishes</h3>
          <p className="text-3xl font-bold text-amber-600">{popularDishes.length}</p>
          <p className="text-sm text-gray-500 mt-1">Top performing items</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tables Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tables</h2>
          <div className="grid grid-cols-4 gap-3">
            {ownerTables.map((table) => (
              <div
                key={table.id}
                className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-medium ${
                  table.status === 'available'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                T{table.number}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-black rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
              <span>Reserved</span>
            </div>
          </div>
        </div>

        {/* Popular Dishes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Dishes</h2>
          <div className="space-y-4">
            {popularDishes.map((dish) => (
              <div key={dish.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{dish.name}</h4>
                  <p className="text-sm text-gray-600">{dish.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    KSh {dish.price.toLocaleString()}
                  </p>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Menu */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Menu</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurant.dishes.map((dish) => (
            <div key={dish.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-800">{dish.name}</h4>
                {dish.isPopular && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
              <p className="font-semibold text-green-600">
                KSh {dish.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
        </>
      )}

      {/* Manage Dishes Tab */}
      {activeTab === 'dishes' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add New Dish */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Dish</h2>
            <form onSubmit={handleAddDish} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter dish name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (KSh) *
                </label>
                <input
                  type="number"
                  value={newDish.price}
                  onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the dish"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Add Dish
              </button>
            </form>
          </div>

          {/* Update Prices */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Update Prices</h2>
            <div className="space-y-4">
              {restaurant.dishes.map((dish) => (
                <div key={dish.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">{dish.name}</h4>
                    <p className="text-sm text-gray-600">Current: KSh {dish.price.toLocaleString()}</p>
                  </div>
                  <input
                    type="number"
                    placeholder="New price"
                    value={priceUpdates[dish.id] || ''}
                    onChange={(e) => setPriceUpdates({ ...priceUpdates, [dish.id]: e.target.value })}
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                onClick={handleUpdatePrices}
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Update Prices
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Management Tab */}
      {activeTab === 'tables' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Table Status Management */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Table Status</h2>
            <div className="grid grid-cols-3 gap-4">
              {ownerTables.map((table) => (
                <div key={table.id} className="text-center">
                  <button
                    onClick={() => toggleTableStatus(table.id)}
                    className={`w-full aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-medium mb-2 transition-colors ${
                      table.status === 'available'
                        ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                        : 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                    }`}
                  >
                    T{table.number}
                  </button>
                  <p className="text-xs text-gray-600">
                    {table.status === 'available' ? 'Available' : 'Reserved'}
                  </p>
                  <p className="text-xs text-gray-500">Cap: {table.capacity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Reservations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Phone Reservations</h2>
            <form onSubmit={handleReserveTable} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Table *
                </label>
                <select
                  value={reservationForm.tableId}
                  onChange={(e) => setReservationForm({ ...reservationForm, tableId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a table...</option>
                  {ownerTables.filter(t => t.status === 'available').map((table) => (
                    <option key={table.id} value={table.id}>
                      Table {table.number} (Capacity: {table.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={reservationForm.customerName}
                  onChange={(e) => setReservationForm({ ...reservationForm, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={reservationForm.customerPhone}
                  onChange={(e) => setReservationForm({ ...reservationForm, customerPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+254 700 000 000"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={reservationForm.date}
                    onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={reservationForm.time}
                    onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                Reserve Table
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {[
              { id: '1', customer: 'John Doe', items: 'Grilled Chicken x2, Beef Kebabs x1', total: 3900, status: 'Preparing', time: '10:30 AM' },
              { id: '2', customer: 'Sarah Ahmed', items: 'Grilled Fish x1, Coconut Rice x2', total: 3000, status: 'Ready', time: '10:15 AM' },
              { id: '3', customer: 'Mike Johnson', items: 'Beef Kebabs x3', total: 4500, status: 'Delivered', time: '9:45 AM' },
            ].map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">Order #{order.id}</h4>
                    <p className="text-sm text-gray-600">{order.customer} - {order.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Ready' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{order.items}</p>
                <p className="font-semibold text-green-600">KSh {order.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Sales Analytics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Today's Sales</span>
                <span className="font-semibold text-green-600">KSh 15,400</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>This Week</span>
                <span className="font-semibold text-green-600">KSh 89,200</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>This Month</span>
                <span className="font-semibold text-green-600">KSh {owner.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Average Order Value</span>
                <span className="font-semibold text-blue-600">KSh 1,250</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Top Performing Dishes</h2>
            <div className="space-y-3">
              {restaurant.dishes.slice(0, 5).map((dish, index) => (
                <div key={dish.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{dish.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{Math.floor(Math.random() * 50) + 10} orders</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}