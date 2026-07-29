import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const handleWhatsApp = () => {
    const phoneNumber = '919580295393';
    const message = encodeURIComponent(
      'Hello Vimal Tech Academy! I want to enquire about Computer Courses & Admissions.'
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-lg hover:shadow-emerald-600/30 transition-all duration-300 group"
      title="Chat with Admission Counselor on WhatsApp"
    >
      <MessageSquare className="w-5 h-5 fill-current" />
      <span className="text-xs font-semibold tracking-wide hidden sm:inline">WhatsApp Enquiry</span>
    </button>
  );
};
