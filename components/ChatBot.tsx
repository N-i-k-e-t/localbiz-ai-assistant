import React, { useState, useRef, useEffect } from 'react';
import { Message, Appointment } from '../types';
import { processMessage } from '../services/aiService';
import { BUSINESS_CONFIG } from '../data';
import { Send, Bot, Phone, MoreVertical, MapPin, User, CheckCircle } from 'lucide-react';

interface ChatBotProps {
  apiKey: string | null;
  onNewBooking?: (booking: Omit<Appointment, 'id' | 'status'>) => void;
}

type ChatState = 'IDLE' | 'ASK_NAME' | 'ASK_PHONE' | 'ASK_AREA' | 'ASK_SERVICE' | 'ASK_TIME';

export const ChatBot: React.FC<ChatBotProps> = ({ apiKey, onNewBooking }) => {
  const [input, setInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>('IDLE');
  
  // Temporary booking data
  const [bookingData, setBookingData] = useState<Partial<Appointment>>({});

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: apiKey 
        ? "Namaste! I am your AI Assistant powered by Gemini. How can I help your business today?" 
        : "Namaste! Welcome to Nashik Home Services. I can help you book AC cleaning, plumbing, or electrician services.",
      timestamp: new Date(),
      options: ["Book Service", "Check Rates", "Contact Support"]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const addBotMessage = (text: string, options: string[] = []) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'bot',
      text,
      options,
      timestamp: new Date()
    }]);
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // --- CONVERSATION STATE MACHINE ---
    
    // 1. Handling Name Input
    if (chatState === 'ASK_NAME') {
      setTimeout(() => {
        setBookingData(prev => ({ ...prev, customerName: textToSend }));
        setChatState('ASK_PHONE');
        addBotMessage(`Thanks ${textToSend}. What is your mobile number?`);
        setIsTyping(false);
      }, 500);
      return;
    }

    // 2. Handling Phone Input
    if (chatState === 'ASK_PHONE') {
      setTimeout(() => {
        // Basic validation
        if (textToSend.length < 10) {
          addBotMessage("Please enter a valid 10-digit mobile number.");
          setIsTyping(false);
          return;
        }
        setBookingData(prev => ({ ...prev, customerPhone: textToSend }));
        setChatState('ASK_AREA');
        addBotMessage("Great! Which area in Nashik are you located in?", BUSINESS_CONFIG.areas);
        setIsTyping(false);
      }, 500);
      return;
    }

    // 3. Handling Area Input
    if (chatState === 'ASK_AREA') {
      setTimeout(() => {
        setBookingData(prev => ({ ...prev, area: textToSend }));
        setChatState('ASK_SERVICE');
        const services = BUSINESS_CONFIG.services.map(s => s.name);
        addBotMessage("Got it. Which service do you need?", services);
        setIsTyping(false);
      }, 500);
      return;
    }

    // 4. Handling Service Input
    if (chatState === 'ASK_SERVICE') {
      setTimeout(() => {
        const selectedService = BUSINESS_CONFIG.services.find(s => 
          textToSend.toLowerCase().includes(s.name.toLowerCase()) || 
          s.name.toLowerCase().includes(textToSend.toLowerCase())
        );

        if (selectedService) {
          setBookingData(prev => ({ 
            ...prev, 
            serviceId: selectedService.id, 
            serviceName: selectedService.name,
            price: selectedService.price 
          }));
          setChatState('ASK_TIME');
          addBotMessage("Almost done! When should we come?", ["Tomorrow 10:00 AM", "Tomorrow 2:00 PM", "Day After 11:00 AM"]);
        } else {
          addBotMessage("Please select a valid service from the list.", BUSINESS_CONFIG.services.map(s => s.name));
        }
        setIsTyping(false);
      }, 500);
      return;
    }

    // 5. Handling Time & Confirmation
    if (chatState === 'ASK_TIME') {
      setTimeout(() => {
        // Finalize Booking
        const finalBooking = {
          customerName: bookingData.customerName!,
          customerPhone: bookingData.customerPhone!,
          area: bookingData.area!,
          serviceId: bookingData.serviceId!,
          serviceName: bookingData.serviceName!,
          price: bookingData.price!,
          date: new Date().toISOString().split('T')[0], // Mock date
          time: textToSend
        };

        if (onNewBooking) {
          onNewBooking(finalBooking);
        }

        setChatState('IDLE');
        setBookingData({});
        
        addBotMessage(
          `✅ Booking Request Received!\n\nName: ${finalBooking.customerName}\nService: ${finalBooking.serviceName}\nTime: ${finalBooking.time}\n\nOur admin will verify and confirm your booking shortly on ${finalBooking.customerPhone}.`,
          ["Okay, Thanks", "Book Another"]
        );
        setIsTyping(false);
      }, 800);
      return;
    }

    // --- NORMAL AI PROCESSING (IDLE STATE) ---

    // Trigger Booking Flow manually
    if (textToSend.toLowerCase().includes('book') || textToSend.toLowerCase().includes('appointment')) {
      setTimeout(() => {
        setChatState('ASK_NAME');
        addBotMessage("Sure, let's book an appointment. What is your full name?");
        setIsTyping(false);
      }, 500);
      return;
    }

    // Normal Q&A
    const history = messages.slice(-5).map(m => `${m.sender}: ${m.text}`).join('\n');
    try {
      const response = await processMessage(textToSend, apiKey, history);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.text,
        options: response.options,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#e5ddd5] rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-[#075e54] text-white p-4 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-semibold">Nashik Home Services</h3>
            <p className="text-xs text-green-100 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Phone size={20} className="opacity-80 cursor-pointer hover:opacity-100" />
          <MoreVertical size={20} className="opacity-80 cursor-pointer hover:opacity-100" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Bubble */}
            <div
              className={`max-w-[85%] p-3 rounded-lg shadow-sm relative text-sm md:text-base ${
                msg.sender === 'user'
                  ? 'bg-[#dcf8c6] rounded-tr-none'
                  : 'bg-white rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap text-gray-800">{msg.text}</p>
              <p className="text-[10px] text-gray-500 text-right mt-1 opacity-70">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Quick Reply Buttons */}
            {msg.sender === 'bot' && msg.options && msg.options.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 max-w-[90%]">
                {msg.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(option)}
                    className="bg-white text-[#075e54] border border-[#075e54] px-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:bg-[#075e54] hover:text-white transition-all transform hover:scale-105"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {/* Progress Indicator for Booking */}
        {chatState !== 'IDLE' && (
           <div className="flex justify-center my-2">
             <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full border border-yellow-200">
               Booking in progress...
             </span>
           </div>
        )}

        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-gray-100 flex items-center gap-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={chatState === 'IDLE' ? "Type a message..." : "Type your answer here..."}
          className={`flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#075e54] text-sm ${chatState !== 'IDLE' ? 'ring-2 ring-yellow-200' : ''}`}
        />
        <button
          onClick={() => handleSend()}
          className="bg-[#075e54] text-white p-3 rounded-full hover:bg-[#064c44] transition-colors shadow-sm"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};