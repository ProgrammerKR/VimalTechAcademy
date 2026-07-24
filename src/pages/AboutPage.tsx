import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { MOCK_FACULTY } from '../data/mockData';
import {
  Award,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Target,
  Eye,
  GraduationCap,
  Users2,
  Laptop,
  Check,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumb pageTitle="About Institute" />

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200/80 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> Established 2014 • ISO 9001:2015 Certified
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Vimal Tech Academy
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Vimal Tech Academy is a premier computer education center dedicated to closing the digital skill gap in India. Founded by experienced software engineers and educators, our mission is to empower youth, job aspirants, and working professionals with job-ready IT skills.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-semibold text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>50+ High-End Systems</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>5,000+ Alumni Certified</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
                  alt="Vimal Tech Academy Lab Facility"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-4 flex items-end">
                  <p className="text-xs font-bold text-white">State-of-the-art i5 Air-Conditioned Computer Lab 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Director Message & Infrastructure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Director Message */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={MOCK_FACULTY[0].photoUrl}
                alt="Director"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{MOCK_FACULTY[0].name}</h3>
                <p className="text-xs font-semibold text-blue-600">{MOCK_FACULTY[0].designation}</p>
                <p className="text-[11px] text-slate-400">{MOCK_FACULTY[0].qualification}</p>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4 text-xs text-slate-600 leading-relaxed italic space-y-2">
              <p>
                "At Vimal Tech Academy, our core philosophy is simple: Education without practical implementation is incomplete. We ensure that every student who walks through our doors gains confidence, hands-on computer expertise, and industry certification."
              </p>
              <p className="not-italic text-slate-500 font-medium">
                Whether you are applying for government clerical exams, private accounting roles, or IT web software internships, our curriculum is engineered for success.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600">
                <Target className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">Our Mission</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                To provide high-quality, affordable, and practical computer coaching with state-of-the-art laboratory infrastructure, updated courseware, and job guidance.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-indigo-600">
                <Eye className="w-5 h-5" />
                <h3 className="text-base font-bold text-slate-900">Our Vision</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                To be the most trusted computer coaching institute in the region, recognized for academic excellence, 100% practical lab satisfaction, and successful student career placements.
              </p>
            </div>
          </div>
        </div>

        {/* Faculty & Instructors Section */}
        <div className="bg-white p-8 lg:p-12 rounded-3xl border border-slate-200/80 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Expert Mentors
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">Meet Our Experienced Faculty</h2>
            <p className="text-xs text-slate-500">Dedicated computer instructors with years of teaching & industry experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_FACULTY.map((fac) => (
              <div
                key={fac.id}
                className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 text-center hover:border-blue-300 transition-all group"
              >
                <img
                  src={fac.photoUrl}
                  alt={fac.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white shadow-md group-hover:scale-105 transition-transform"
                />
                <h4 className="text-sm font-bold text-slate-900">{fac.name}</h4>
                <p className="text-[11px] font-semibold text-blue-600 mt-0.5">{fac.designation}</p>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">{fac.qualification}</p>
                <span className="inline-block mt-3 text-[10px] bg-white px-2.5 py-1 rounded-full text-slate-600 border border-slate-200 font-semibold">
                  {fac.experience}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
