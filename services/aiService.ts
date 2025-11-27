import { GoogleGenAI } from "@google/genai";
import { BUSINESS_CONFIG } from "../data";

interface AIResponse {
  text: string;
  options?: string[];
}

// 1. Local "Offline" Intelligence
// Improved with a basic state machine and strict context handling
class LocalIntelligence {
  process(text: string): AIResponse {
    const lowerText = text.toLowerCase();
    
    // --- Contextual Exact Matches (from Buttons) ---
    
    if (lowerText.includes("show services") || lowerText.includes("check rates")) {
      const serviceOptions = BUSINESS_CONFIG.services.map(s => `${s.name} (₹${s.price})`);
      return {
        text: "Here are our professional services available in Nashik. Please select one to proceed:",
        options: [...serviceOptions, "Back to Menu"]
      };
    }

    if (lowerText.includes("book now") || lowerText.includes("yes, book")) {
      return {
        text: "Great! Please select a preferred time slot for our technician to visit:",
        options: ["Tomorrow 10:00 AM", "Tomorrow 02:00 PM", "Day After 11:00 AM", "Pick Custom Date"]
      };
    }

    if (lowerText.match(/tomorrow|day after|am|pm/)) {
      return {
        text: `Booking Confirmed! ✅\n\nOur technician will arrive at the selected time. We have sent a confirmation to your WhatsApp number: ${BUSINESS_CONFIG.phone}.\n\nNeed anything else?`,
        options: ["Show Services", "Contact Support", "Go to Dashboard"]
      };
    }

    if (lowerText.includes("contact support") || lowerText.includes("call")) {
      return {
        text: `You can reach our manager directly at ${BUSINESS_CONFIG.phone} or visit us at ${BUSINESS_CONFIG.location}.`,
        options: ["Back to Menu"]
      };
    }

    // --- Service Selection Logic ---
    const matchedService = BUSINESS_CONFIG.services.find(s => lowerText.includes(s.name.toLowerCase()));
    if (matchedService) {
      return {
        text: `Good choice! **${matchedService.name}** costs ₹${matchedService.price} and takes about ${matchedService.duration} mins.\n\nWould you like to confirm this booking?`,
        options: ["Yes, Book Now", "Check Other Services"]
      };
    }

    // --- General NLP / Regex Logic ---

    // Gratitude / Acknowledgment (Handle "Ok", "Thank you")
    if (lowerText.match(/\b(ok|okay|thx|thanks|thank you|done|great|cool)\b/)) {
      return {
        text: "You're welcome! 🙏 We look forward to serving you. Have a great day!",
        options: ["Back to Menu"]
      };
    }

    // Greeting
    if (lowerText.match(/hi|hello|namaste|start|hey/)) {
      return {
        text: `Namaste! Welcome to ${BUSINESS_CONFIG.name}. \nI am your automated assistant. How can I help you today?`,
        options: ["Show Services", "Check Rates", "Contact Support"]
      };
    }

    // Location
    if (lowerText.match(/location|address|area|where/)) {
      return {
        text: `We are located at ${BUSINESS_CONFIG.location}. We serve College Road, Gangapur Road, and Indira Nagar areas.`,
        options: ["Show Services", "Back to Menu"]
      };
    }

    // Marathi Handling
    if (lowerText.match(/kasa|aahe|kay|kuthe|marathi/)) {
      return {
        text: "Namaste! Mee sadhya English madhe uttar deu shakte. (I currently respond in English). Please select an option below:",
        options: ["Show Services", "Contact Support"]
      };
    }

    // --- Error / Off-Topic Handling ---
    // If the input doesn't match service-related keywords, return a fallback.
    return {
      text: "I apologize, but I didn't understand that. I am designed to assist with Home Services only.\n\nWould you like to see our services?",
      options: ["Show Services", "Contact Support"]
    };
  }
}

// 2. Real Gemini Service
const generateGeminiResponse = async (apiKey: string, userPrompt: string, history: string): Promise<AIResponse> => {
  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // We instruct Gemini to return a specific separator for options if possible, 
    // but for simplicity in this hybrid mode, we will just return text from Gemini 
    // and append generic options on the UI side or handle strictly text.
    // However, to match the UI, let's prompt it to be helpful.
    
    const context = `
      You are the AI assistant for '${BUSINESS_CONFIG.name}', a local service business.
      Address: ${BUSINESS_CONFIG.location}
      Phone: ${BUSINESS_CONFIG.phone}
      Services: ${BUSINESS_CONFIG.services.map(s => `${s.name} (₹${s.price})`).join(', ')}.
      
      Goal: Help user book services.
      If user asks about something unrelated (e.g. politics, coding, general knowledge), politely decline and steer back to the business services.
      
      IMPORTANT: If you suggest options, list them in the text clearly.
    `;

    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model,
      contents: [
        { role: 'user', parts: [{ text: `System: ${context}\nHistory: ${history}\nUser: ${userPrompt}` }] }
      ],
    });

    // Gemini returns plain text. We can add default navigation options.
    return {
      text: response.text || "Sorry, I couldn't generate a response.",
      options: ["Show Services", "Contact Support"] 
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      text: "I'm having trouble connecting to the server right now. Please check your internet or API key.",
      options: ["Retry"]
    };
  }
};

// Main Export
export const processMessage = async (
  text: string, 
  apiKey: string | null, 
  history: string
): Promise<AIResponse> => {
  // If no API Key, use the Local Offline Engine
  if (!apiKey) {
    // Simulate network delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 500)); 
    const engine = new LocalIntelligence();
    return engine.process(text);
  }

  // Use Real AI
  return await generateGeminiResponse(apiKey, text, history);
};