import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import { REVENUE_DATA, MOCK_APPOINTMENTS, MOCK_CUSTOMERS } from '../data';
import { TrendingUp, Users, Calendar, IndianRupee } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const totalRevenue = REVENUE_DATA.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalBookings = REVENUE_DATA.reduce((acc, curr) => acc + curr.bookings, 0);
  
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">₹{totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <IndianRupee size={24} />
            </div>
          </div>
          <span className="text-xs text-green-600 font-medium flex items-center mt-2">
            <TrendingUp size={12} className="mr-1" /> +12% from last week
          </span>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active Bookings</p>
              <h3 className="text-2xl font-bold text-gray-800">{totalBookings}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Calendar size={24} />
            </div>
          </div>
          <span className="text-xs text-gray-500 mt-2 block">Next: {MOCK_APPOINTMENTS[0].serviceName}</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active Customers</p>
              <h3 className="text-2xl font-bold text-gray-800">{MOCK_CUSTOMERS.length}</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Users size={24} />
            </div>
          </div>
          <span className="text-xs text-purple-600 font-medium mt-2 block">+2 New this week</span>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Avg Lead Score</p>
              <h3 className="text-2xl font-bold text-gray-800">72/100</h3>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <span className="text-xs text-gray-500 mt-2 block">High Intent</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend (Last 7 Days)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Bookings by Day</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f0fdf4'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};