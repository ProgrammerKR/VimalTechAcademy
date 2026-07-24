import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Users,
  Award,
  CheckCircle2,
  BookOpen,
  Laptop,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50 to-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative background grid and soft radial glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f7ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f7ff_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-blue-200 text-blue-700 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Govt. Recognized ISO 9001:2015 Certified Computer Institute</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Master Tech & Computer Skills for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
                High-Paying Careers
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              Transform your future with industry-aligned computer courses in ADCA, Tally Prime GST, Web Development, CCC, and Bilingual Typing. 100% practical lab practice and job assistance.
            </p>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-700 pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Lab Practice</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Govt Recognized Certs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-slate-200/60 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Placement Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => navigateTo('admission')}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2.5 text-sm"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Apply Online Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('courses')}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl border border-slate-200 shadow-sm transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Explore All Courses</span>
              </button>
            </div>
          </div>

          {/* Right Visual Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glass Hero Graphic Box */}
              <div className="relative rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Vimal Tech Lab Status</h4>
                      <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Admissions Active 2026-27
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-1 bg-amber-50 text-amber-700 rounded border border-amber-200">
                    Popular Batch
                  </span>
                </div>

                <div className="py-4 space-y-3">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">ADCA Master Diploma</p>
                      <p className="text-[11px] text-slate-500">12 Months • Advanced MS Excel, Tally GST & Photoshop</p>
                    </div>
                    <span className="text-xs font-bold text-blue-600">₹1,000/mo</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Tally Prime GST Masterclass</p>
                      <p className="text-[11px] text-slate-500">3 Months • Billing, Voucher Entry & E-Filing</p>
                    </div>
                    <span className="text-xs font-bold text-blue-600">₹1,700/mo</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">CCC Govt Certification</p>
                      <p className="text-[11px] text-slate-500">3 Months • Computer Concepts & Online Test Prep</p>
                    </div>
                    <span className="text-xs font-bold text-blue-600">₹3,500</span>
                  </div>
                </div>

                {/* Floating Stat Pill Overlay */}
                <div className="absolute -bottom-5 -left-5 bg-slate-900 text-white p-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-white">5,000+</p>
                    <p className="text-[10px] text-slate-400 font-medium">Students Certified & Placed</p>
                  </div>
                </div>

                <div className="absolute -top-5 -right-5 bg-emerald-600 text-white p-3 rounded-xl shadow-xl flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-300" />
                  <span className="text-xs font-bold">ISO 9001:2015</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
