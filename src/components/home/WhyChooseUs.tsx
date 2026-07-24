import React from 'react';
import {
  MonitorCheck,
  Award,
  Users2,
  Clock,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: '100% Practical Lab Hands-On',
      description: 'Every student gets dedicated computer access with high-speed internet, modern i5 processors, and up-to-date software tools.',
      icon: MonitorCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'ISO 9001:2015 & Govt. Recognized',
      description: 'Our institute certificates are accepted across government employment exchanges, corporate offices, and CA accounting firms.',
      icon: Award,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      title: 'Expert Faculty & Mentorship',
      description: 'Learn directly from M.Tech & MCA qualified computer engineers and certified CA accounting professionals.',
      icon: Users2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Flexible Batch Timings',
      description: 'Morning, afternoon, and evening batches starting from 07:00 AM to 08:00 PM for college students and working professionals.',
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      title: 'Job & Placement Assistance',
      description: 'Free resume building, mock job interviews, typing speed test coaching, and direct walk-in placement opportunities.',
      icon: FileCheck2,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      title: 'Online Verification & QR Certificates',
      description: 'Instant employer verification through our official digital portal with tamper-proof certificate records.',
      icon: ShieldCheck,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
    },
  ];

  return (
    <section className="py-20 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Why Choose Vimal Tech Academy
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Building Technical Excellence for Over 12 Years
          </h2>
          <p className="text-base text-slate-600 font-normal">
            We don't just teach computer shortcuts; we build real career confidence with hands-on practice, industry tools, and recognized certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
