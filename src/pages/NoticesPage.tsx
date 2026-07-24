import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Bell, Calendar, AlertCircle, Search } from 'lucide-react';

export const NoticesPage: React.FC = () => {
  const { notices } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All'
    ? notices
    : notices.filter((n) => n.category === selectedCategory);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle="Notices & Announcements" />

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Institute Notice Board</h1>
            <p className="text-xs text-slate-500 mt-1">Stay updated with exam circulars, holidays, and campus placement drives.</p>
          </div>

          <div className="flex gap-2">
            {['All', 'Exam', 'Holiday', 'Placement', 'Admission'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((notice) => (
            <div
              key={notice.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                    notice.category === 'Exam'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : notice.category === 'Placement'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {notice.category}
                </span>

                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Published: {notice.date}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{notice.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{notice.content}</p>

              {notice.important && (
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Important Circular - All Students Must Note</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
