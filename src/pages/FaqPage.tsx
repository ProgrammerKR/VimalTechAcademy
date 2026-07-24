import React, { useState } from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      question: 'Are Vimal Tech Academy computer certificates recognized for government jobs?',
      answer: 'Yes! Vimal Tech Academy is an ISO 9001:2015 certified computer institute. Our certificates (CCC, ADCA, DCA, Tally) are recognized across government employment exchanges, courts, postal departments, and private corporate firms.',
    },
    {
      question: 'How do I verify a student certificate online?',
      answer: 'Go to our "Certificates" tab in the top navigation, enter your Certificate Code (e.g. CERT-VTA-8942) or Registration Number, and click "Verify Now". You will see an instant digital verification record with golden seal & QR code.',
    },
    {
      question: 'Can I pay the course fee in monthly installments?',
      answer: 'Yes! We offer easy monthly installment options (EMI) for long-term programs like ADCA and Web Development, with zero interest.',
    },
    {
      question: 'What are the computer lab timings?',
      answer: 'Our lab is open from 07:00 AM to 08:00 PM Monday through Saturday. Students can practice in their allotted batch timing or request extra practice hours.',
    },
    {
      question: 'Do you provide job placement support?',
      answer: 'Yes! We conduct resume building workshops, typing speed drills, and direct placement walk-ins with regional CA firms, IT service companies, and corporate offices.',
    },
  ];

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle="Frequently Asked Questions" />

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
              <p className="text-xs text-slate-500">Find answers regarding admissions, exams, fee structure & certifications.</p>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search FAQ question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
