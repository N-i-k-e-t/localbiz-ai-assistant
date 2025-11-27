import React from 'react';
import { MOCK_CUSTOMERS } from '../data';
import { Phone, Mail, Star } from 'lucide-react';

export const Customers: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Customer Database</h2>
          <p className="text-sm text-gray-500">Manage leads and client history</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4">Lead Score</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_CUSTOMERS.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-400">ID: {customer.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={14} /> {customer.phone}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-700' :
                      customer.status === 'New' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                         <div 
                           className={`h-full ${customer.leadScore > 80 ? 'bg-green-500' : customer.leadScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                           style={{width: `${customer.leadScore}%`}}
                         ></div>
                       </div>
                       <span className="text-xs font-semibold">{customer.leadScore}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">₹{customer.totalSpent}</td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View History</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};