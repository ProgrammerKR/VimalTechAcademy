import React from 'react';
import { MOCK_TESTIMONIALS } from '../../data/mockData';
import { Star, Quote, Building } from 'lucide-react';

export const SuccessStories: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Student Alumni Success
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Real Stories From Placed Alumni
          </h2>
          <p className="text-sm text-slate-400 font-normal">
            Our students work as computer operators, accounts executives, graphic designers, and frontend assistants in top regional & corporate firms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-400/40" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic mb-6">"{t.review}"</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-700/60">
                <img
                  src={t.photoUrl}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-blue-400 font-semibold">{t.designation}</p>
                  <p className="text-[10px] text-slate-400">{t.company} • {t.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
