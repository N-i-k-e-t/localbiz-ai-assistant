import React from 'react';
import { Appointment } from '../types';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, User, Phone } from 'lucide-react';

interface AppointmentsProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: 'Confirmed' | 'Rejected') => void;
}

export const Appointments: React.FC<AppointmentsProps> = ({ appointments, onUpdateStatus }) => {
  return (
    <div className="p-6">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
         <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
           + Manual Booking
         </button>
       </div>

       <div className="grid gap-4">
         {appointments.length === 0 && (
           <div className="text-center py-10 text-gray-500 bg-white rounded-xl border border-gray-100">
             No appointments found.
           </div>
         )}

         {appointments.map((apt) => (
           <div key={apt.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 transition-all hover:shadow-md">
             
             {/* Left Section: Info */}
             <div className="flex items-start gap-4 flex-1">
               <div className={`p-3 rounded-lg ${apt.status === 'Confirmed' ? 'bg-green-50 text-green-600' : apt.status === 'Pending' ? 'bg-orange-50 text-orange-500' : 'bg-gray-100 text-gray-500'}`}>
                 <Calendar size={24} />
               </div>
               <div>
                 <h3 className="font-semibold text-gray-900 text-lg">{apt.serviceName}</h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-2">
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                     <User size={14} /> <span className="font-medium">{apt.customerName}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                     <Phone size={14} /> <span>{apt.customerPhone}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                     <Clock size={14} /> <span>{apt.date} at {apt.time}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-600">
                     <MapPin size={14} /> <span>{apt.area}</span>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Right Section: Status & Actions */}
             <div className="flex flex-col items-end gap-3 w-full lg:w-auto border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
               <div className="text-right">
                 <div className="text-xl font-bold text-gray-900">₹{apt.price}</div>
                 <div className={`text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1 ${
                   apt.status === 'Confirmed' ? 'text-green-600' : 
                   apt.status === 'Pending' ? 'text-orange-600' : 
                   'text-red-500'
                 }`}>
                   <span className={`w-2 h-2 rounded-full ${
                      apt.status === 'Confirmed' ? 'bg-green-500' : 
                      apt.status === 'Pending' ? 'bg-orange-500' : 
                      'bg-red-500'
                   }`}></span>
                   {apt.status}
                 </div>
               </div>

               {/* Action Buttons for Pending */}
               {apt.status === 'Pending' && (
                 <div className="flex gap-2">
                   <button 
                     onClick={() => onUpdateStatus(apt.id, 'Confirmed')}
                     className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors shadow-sm"
                   >
                     <CheckCircle size={14} /> Approve
                   </button>
                   <button 
                     onClick={() => onUpdateStatus(apt.id, 'Rejected')}
                     className="flex items-center gap-1 bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                   >
                     <XCircle size={14} /> Reject
                   </button>
                 </div>
               )}
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};