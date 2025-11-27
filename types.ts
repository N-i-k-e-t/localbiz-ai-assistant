export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalSpent: number;
  lastVisit: string;
  leadScore: number; // 0-100
  status: 'Active' | 'New' | 'Dormant';
}

export interface Appointment {
  id: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  area: string;
  serviceId: string;
  serviceName: string;
  date: string; // ISO Date
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'Rejected';
  price: number;
}

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  intent?: string;
  options?: string[]; // Quick reply buttons
}

export interface AnalyticsData {
  name: string;
  revenue: number;
  bookings: number;
}

export enum AppView {
  DASHBOARD = 'dashboard',
  CHAT = 'chat',
  CALENDAR = 'calendar',
  CUSTOMERS = 'customers',
  SETTINGS = 'settings'
}