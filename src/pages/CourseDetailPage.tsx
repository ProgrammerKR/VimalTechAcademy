import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  Clock,
  GraduationCap,
  Award,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { selectedCourseId, courses, navigateTo } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle={course.title} category="Courses" />

        {/* Course Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 lg:p-12 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold border border-blue-400/30 uppercase tracking-wider">
                {course.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                Code: {course.code}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{course.title}</h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{course.fullDescription}</p>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-slate-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Duration: <strong className="text-white">{course.duration}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Eligibility: <strong className="text-white">{course.eligibility}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>ISO Certified Diploma Certificate</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigateTo('admission')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
              >
                <span>Enroll / Apply Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Syllabus & Overview Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Detailed Module Breakdown */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Complete Course Syllabus</h3>
                  <p className="text-xs text-slate-500">Module by module practical and theory curriculum breakdown</p>
                </div>
              </div>

              <div className="space-y-4">
                {course.syllabus.map((mod, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-extrabold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{mod.moduleTitle}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                      {mod.topics.map((top, tIdx) => (
                        <div key={tIdx} className="text-xs text-slate-600 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{top}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Career & Job Roles</h3>
                  <p className="text-xs text-slate-500">Industry job options available after completing this course</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {course.careerOpportunities.map((career, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Fee & Admission Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">Fee Structure & Pricing</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs font-semibold">
                  <span className="text-slate-500">Total Course Fee:</span>
                  <span className="text-lg font-black text-slate-900">₹{course.totalFee.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs font-semibold">
                  <span className="text-slate-500">Admission Fee:</span>
                  <span className="text-slate-800">₹{course.admissionFee.toLocaleString()}</span>
                </div>

                {course.monthlyFee && (
                  <div className="flex items-center justify-between p-3 bg-blue-50/60 rounded-xl text-xs font-semibold text-blue-900 border border-blue-100">
                    <span className="text-blue-700">Easy Monthly Installment:</span>
                    <span className="font-bold">₹{course.monthlyFee}/month</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-800">What is Included:</p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Practical Computer Lab Seat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free Printed Notes & Study PDF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ISO Certified Seal Certificate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Digital ID Card & Student Portal</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigateTo('admission')}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Online Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
