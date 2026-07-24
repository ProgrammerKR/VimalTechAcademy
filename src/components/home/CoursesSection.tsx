import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  GraduationCap,
  ArrowRight,
  Check,
  Star,
  Sparkles,
  Award,
} from 'lucide-react';

export const CoursesSection: React.FC = () => {
  const { courses, navigateTo } = useApp();
  const [selectedTab, setSelectedTab] = useState<'All' | 'Diploma' | 'Certificate' | 'Specialized Skill'>('All');

  const filteredCourses = selectedTab === 'All'
    ? courses
    : courses.filter((c) => c.category === selectedTab);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Job-Oriented Catalog
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Career & Technical Computer Courses
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              From beginner computer literacy to advanced diploma and accounting software, select the program that fits your career goal.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {(['All', 'Diploma', 'Certificate', 'Specialized Skill'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTab === tab
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.slice(0, 6).map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                    {course.category}
                  </span>
                  {course.isPopular && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Most Popular
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {course.shortDescription}
                </p>

                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 py-3 border-y border-slate-100 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-500" />
                    <span>{course.eligibility.split(' ')[0]} Eligibility</span>
                  </div>
                </div>

                <ul className="space-y-1.5 mb-2">
                  {course.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 pt-0 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Fee</p>
                  <p className="text-lg font-extrabold text-slate-900">
                    ₹{course.totalFee.toLocaleString()}{' '}
                    {course.monthlyFee && (
                      <span className="text-xs font-normal text-slate-500">
                        (or ₹{course.monthlyFee}/mo)
                      </span>
                    )}
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('course-detail', course.id)}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('courses')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
          >
            <span>View All Courses & Full Syllabus</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
