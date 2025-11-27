import { Customer, Appointment, Service, AnalyticsData } from './types';

// Business Configuration (The "Knowledge Base")
export const BUSINESS_CONFIG = {
  name: "Nashik Home Services",
  location: "College Road, Nashik, Maharashtra",
  phone: "+91 98765 43210",
  services: [
    { id: 's1', name: 'AC Deep Cleaning', price: 599, duration: 60 },
    { id: 's2', name: 'Plumbing Check', price: 299, duration: 30 },
    { id: 's3', name: 'Electrician Visit', price: 399, duration: 45 },
    { id: 's4', name: 'Full Home Cleaning', price: 2499, duration: 180 },
  ] as Service[],
  areas: [
    "College Road",
    "Gangapur Road",
    "Indira Nagar",
    "Panchavati",
    "Nashik Road",
    "Satpur",
    "CIDCO"
  ],
  faqs: [
    { q: "area", a: "We serve College Road, Gangapur Road, Panchavati, Nashik Road, and Indira Nagar." },
    { q: "payment", a: "We accept UPI, Cash, and Card payments after service." },
    { q: "timing", a: "We are open Monday to Saturday, 9 AM to 8 PM." }
  ]
};

// Mock Customers
export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Rajesh Patil', phone: '+91 98XXX XXXXX', totalSpent: 1200, lastVisit: '2023-10-15', leadScore: 85, status: 'Active' },
  { id: 'c2', name: 'Priya Deshmukh', phone: '+91 99XXX XXXXX', totalSpent: 4500, lastVisit: '2023-10-20', leadScore: 92, status: 'Active' },
  { id: 'c3', name: 'Amit Joshi', phone: '+91 70XXX XXXXX', totalSpent: 0, lastVisit: 'N/A', leadScore: 40, status: 'New' },
];

// Mock Appointments
export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', customerId: 'c1', customerName: 'Rajesh Patil', customerPhone: '9890098900', area: 'College Road', serviceId: 's1', serviceName: 'AC Deep Cleaning', date: '2023-10-25', time: '10:00 AM', status: 'Confirmed', price: 599 },
  { id: 'a2', customerId: 'c2', customerName: 'Priya Deshmukh', customerPhone: '9922099220', area: 'Gangapur Road', serviceId: 's4', serviceName: 'Full Home Cleaning', date: '2023-10-25', time: '02:00 PM', status: 'Pending', price: 2499 },
];

// Analytics Data
export const REVENUE_DATA: AnalyticsData[] = [
  { name: 'Mon', revenue: 4000, bookings: 5 },
  { name: 'Tue', revenue: 3000, bookings: 3 },
  { name: 'Wed', revenue: 2000, bookings: 2 },
  { name: 'Thu', revenue: 2780, bookings: 4 },
  { name: 'Fri', revenue: 1890, bookings: 2 },
  { name: 'Sat', revenue: 6390, bookings: 9 },
  { name: 'Sun', revenue: 3490, bookings: 5 },
];