import React from 'react';
import { MOCK_GALLERY } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { Camera, ArrowRight, Eye } from 'lucide-react';

export const GalleryPreview: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Infrastructure & Campus
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Campus & High-Tech Lab Life
            </h2>
            <p className="text-xs text-slate-600">
              Modern air-conditioned computer labs, interactive smart classrooms, and award ceremonies.
            </p>
          </div>
          <button
            onClick={() => navigateTo('gallery')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
          >
            <Camera className="w-4 h-4 text-blue-600" />
            <span>Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_GALLERY.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
