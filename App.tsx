import React, { useState } from 'react';
import { AppView, Appointment } from './types';
import { Dashboard } from './components/Dashboard';
import { ChatBot } from './components/ChatBot';
import { Customers } from './components/Customers';
import { Appointments } from './components/Appointments';
import { BUSINESS_CONFIG, MOCK_APPOINTMENTS } from './data';
import { 
  LayoutDashboard, MessageSquare, Users, Calendar, Settings, Zap, 
  ArrowRight, ShieldCheck, User, Clock, CheckCircle, LogOut 
} from 'lucide-react';

type AppMode = 'LANDING' | 'PUBLIC_CHAT' | 'LOGIN' | 'ADMIN';

const App: React.FC = () => {
  const [appMode, setAppMode] = useState<AppMode>('LANDING');
  
  // Shared Data State
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  
  // Admin State
  const [adminView, setAdminView] = useState<AppView>(AppView.DASHBOARD);
  const [apiKey, setApiKey] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);

  // Helper to add new booking from Chat
  const handleNewBooking = (bookingData: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      id: `a${Date.now()}`,
      status: 'Pending',
      ...bookingData
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  // Helper to update booking status from Admin
  const handleUpdateStatus = (id: string, newStatus: 'Confirmed' | 'Rejected') => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  // --- LANDING PAGE COMPONENT ---
  if (appMode === 'LANDING') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white font-sans text-gray-800">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-primary-700">
             <Zap size={32} fill="currentColor" />
             <span className="text-2xl font-bold tracking-tight">LocalBiz AI</span>
          </div>
          {/* Admin button hidden from landing page; staff can access via footer login link */}
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wide">
              Nashik Edition
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Smart Automation for <span className="text-primary-600">Local Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Experience the future of booking. Our AI Assistant helps you schedule services instantly, 24/7, without waiting on hold.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setAppMode('PUBLIC_CHAT')}
          {/* Discreet staff login link */}
          <footer className="mt-6 text-center w-full">
            <button
              onClick={() => setAppMode('LOGIN')}
              className="text-xs text-gray-500 hover:text-primary-600 underline"
            >
              Staff Login
            </button>
          </footer>
                className="flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageSquare size={24} />
                Talk to Assistant
  // --- LOGIN SCREEN ---
  if (appMode === 'LOGIN') {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // simple client-side auth as requested (username: niket, password: @1234)
      if (username.trim() === 'niket' && password === '@1234') {
        setError('');
        setAppMode('ADMIN');
      } else {
        setError('Invalid credentials');
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Staff Login</h2>
          <p className="text-sm text-gray-500 mb-6">Enter your staff credentials to access the admin area.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg" />
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg">Sign In</button>
                <button type="button" onClick={() => setAppMode('LANDING')} className="text-sm text-gray-500 underline">Back</button>
              </div>
              <div className="text-xs text-gray-400">Contact owner for assistance</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
              </button>
              <button className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all">
                View Services
              </button>
            </div>
          </div>

          {/* Service Showcase Card */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              Live Demo
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Services We Offer</h3>
            <div className="space-y-4">
              {BUSINESS_CONFIG.services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-primary-50 border border-transparent hover:border-primary-100 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg text-primary-600 shadow-sm group-hover:scale-110 transition-transform">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{service.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><Clock size={12}/> {service.duration} mins</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₹{service.price}</div>
                    <span className="text-xs text-primary-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Book Now &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">Trusted by 500+ customers</span> in {BUSINESS_CONFIG.location}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- PUBLIC CHAT MODE ---
  if (appMode === 'PUBLIC_CHAT') {
    return (
      <div className="h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              onClick={() => setAppMode('LANDING')}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowRight className="transform rotate-180 text-gray-600" />
            </div>
            <span className="font-bold text-gray-800">LocalBiz Assistant</span>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-6 max-w-3xl mx-auto w-full">
           <ChatBot apiKey={apiKey || null} onNewBooking={handleNewBooking} />
        </div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD MODE ---
  const NavItem = ({ view, icon: Icon, label }: { view: AppView; icon: any; label: string }) => (
    <button
      onClick={() => {
        setAdminView(view);
        setShowSettings(false);
      }}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
        adminView === view && !showSettings
          ? 'bg-primary-100 text-primary-700 font-medium'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div 
            onClick={() => setAppMode('LANDING')}
            className="flex items-center gap-2 text-primary-600 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Zap size={28} fill="currentColor" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">LocalBiz AI</span>
          </div>
          <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
             <div className="bg-primary-100 p-1 rounded-full"><User size={14} className="text-primary-700"/></div>
             <div>
               <p className="text-xs font-bold text-gray-800">Admin User</p>
               <p className="text-[10px] text-gray-500">Business Owner</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem view={AppView.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
          <NavItem view={AppView.CHAT} icon={MessageSquare} label="Test Chatbot" />
          <NavItem view={AppView.CALENDAR} icon={Calendar} label="Appointments" />
          <NavItem view={AppView.CUSTOMERS} icon={Users} label="Customers" />
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={() => setShowSettings(true)}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all ${
              showSettings ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button
            onClick={() => setAppMode('LANDING')}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex md:hidden justify-between items-center">
          <span className="font-bold text-gray-800">LocalBiz Admin</span>
          <LogOut size={20} className="text-gray-500" onClick={() => setAppMode('LANDING')} />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {showSettings ? (
            <div className="p-8 max-w-2xl mx-auto animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">System Settings</h2>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                   <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Zap size={20} /></div>
                   <h3 className="text-lg font-semibold">AI Engine Configuration</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  The system currently uses <strong>Local Intelligence (Offline Mode)</strong> which matches keywords and handles basic flows without internet. 
                  <br/><br/>
                  To enable advanced reasoning (Gemini), enter your API Key below.
                </p>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Google Gemini API Key</label>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API Key here..."
                    className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none transition-shadow"
                  />
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-sm">
                    Save
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">Business Name</label>
                    <input disabled value={BUSINESS_CONFIG.name} className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-200" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-1">Contact Phone</label>
                    <input disabled value={BUSINESS_CONFIG.phone} className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-200" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 block mb-1">Location</label>
                    <input disabled value={BUSINESS_CONFIG.location} className="w-full p-3 bg-gray-50 text-gray-700 rounded-lg border border-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {adminView === AppView.DASHBOARD && <Dashboard />}
              {adminView === AppView.CHAT && (
                <div className="p-4 md:p-8 h-full flex flex-col justify-center max-w-4xl mx-auto">
                  <div className="mb-4 text-center">
                    <h2 className="text-xl font-bold text-gray-800">Test Your Assistant</h2>
                    <p className="text-sm text-gray-500">This simulates what your customers will see.</p>
                  </div>
                  <ChatBot apiKey={apiKey || null} onNewBooking={handleNewBooking} />
                </div>
              )}
              {adminView === AppView.CALENDAR && (
                <Appointments 
                  appointments={appointments} 
                  onUpdateStatus={handleUpdateStatus} 
                />
              )}
              {adminView === AppView.CUSTOMERS && <Customers />}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;