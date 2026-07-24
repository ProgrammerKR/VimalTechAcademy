import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, ArrowRight, Calendar, AlertCircle } from 'lucide-react';

export const AnnouncementsWidget: React.FC = () => {
  const { notices, navigateTo } = useApp();

  return (
    <section className="py-16 bg-blue-50/50 border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Latest Notices & Exam Schedules</h3>
              <p className="text-xs text-slate-500">Official circulars, exam dates, and batch announcements</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('notices')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All Notices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.slice(0, 4).map((notice) => (
            <div
              key={notice.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      notice.category === 'Exam'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : notice.category === 'Placement'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {notice.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3" /> {notice.date}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">{notice.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{notice.content}</p>
              </div>
              {notice.important && (
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-amber-700 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" /> High Priority Circular
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
