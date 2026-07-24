import React, { useState } from 'react';
import { MOCK_GALLERY } from '../data/mockData';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const GalleryPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const filtered = selectedTag === 'All'
    ? MOCK_GALLERY
    : MOCK_GALLERY.filter((g) => g.category === selectedTag);

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle="Campus Photo Gallery" />

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Campus Infrastructure & Events</h1>
            <p className="text-xs text-slate-500 mt-1">High-tech computer labs, classrooms, seminars, and annual prize distribution.</p>
          </div>

          <div className="flex gap-2">
            {['All', 'Labs', 'Events', 'Awards', 'Classrooms'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
