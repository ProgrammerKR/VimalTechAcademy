import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Search, Clock, GraduationCap, ArrowRight, Star, Check } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filtered = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle="Courses Offered" />

        {/* Title & Filter Bar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Explore Computer Courses</h1>
            <p className="text-xs text-slate-500 mt-1">Select from Government certifications, master diplomas, and specialized skills.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search course title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Diploma">Diploma Programs</option>
              <option value="Certificate">Certificate Programs</option>
              <option value="Advanced Diploma">Advanced Diploma</option>
              <option value="Specialized Skill">Specialized Skills</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {course.category}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{course.code}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {course.shortDescription}
                </p>

                <div className="space-y-2 py-3 border-y border-slate-100 mb-4 text-xs font-medium text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-bold text-slate-800">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Daily Timing:</span>
                    <span className="font-semibold text-slate-800">{course.hoursPerDay}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Eligibility:</span>
                    <span className="font-semibold text-slate-800">{course.eligibility}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Key Highlights:</p>
                  {course.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="text-[11px] text-slate-600 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Fee</p>
                  <p className="text-lg font-extrabold text-slate-900">₹{course.totalFee.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('admission')}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => navigateTo('course-detail', course.id)}
                    className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20"
                    title="View Course Syllabus"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
