import React from 'react';
import { Users, Award, BookOpen, CheckCircle, Trophy, Building2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Certified Alumni', value: '5,200+', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Courses', value: '12+', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Job Placements', value: '92%', icon: Trophy, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Years Experience', value: '12+ Yrs', icon: Building2, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <section className="py-10 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                <stat.icon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
