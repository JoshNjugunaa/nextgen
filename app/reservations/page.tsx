'use client';

import { useState } from 'react';
import { tables } from '@/lib/data';

export default function Reservations() {
  const [selectedTable, setSelectedTable] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [guestCount, setGuestCount] = useState(1);

  const availableTables = tables.filter(table => table.status === 'available');

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTable || !reservationDate || !reservationTime || !customerName) {
      alert('Please fill in all required fields!');
      return;
    }

    const selectedTableInfo = tables.find(t => t.id === selectedTable);
    
    alert(`Table reserved successfully!\n\nTable: ${selectedTableInfo?.number}\nDate: ${reservationDate}\nTime: ${reservationTime}\nGuests: ${guestCount}\n\nNote: This is a demo - no actual reservation was made.`);
    
    // Reset form
    setSelectedTable('');
    setReservationDate('');
    setReservationTime('');
    setCustomerName('');
    setGuestCount(1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Table Reservations</h1>
        <p className="text-gray-600">
          Reserve a shared table in our food court for your dining experience
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Tables</h2>
          
          <div className="grid gap-4">
            {tables.map((table) => (
              <div 
                key={table.id} 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  table.status === 'reserved' 
                    ? 'border-red-200 bg-red-50' 
                    : selectedTable === table.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => table.status === 'available' && setSelectedTable(table.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Table {table.number}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Capacity: {table.capacity} people
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    table.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {table.status === 'available' ? 'Available' : 'Reserved'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Make a Reservation</h2>
          
          <form onSubmit={handleReservation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selected Table
              </label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value="">Choose a table...</option>
                {availableTables.map((table) => (
                  <option key={table.id} value={table.id}>
                    Table {table.number} (Capacity: {table.capacity})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <select
                  value={reservationTime}
                  onChange={(e) => setReservationTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Select time...</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="12:30">12:30 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="13:30">1:30 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="14:30">2:30 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="15:30">3:30 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="16:30">4:30 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Guests
              </label>
              <input
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                min="1"
                max="8"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              Reserve Table
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}