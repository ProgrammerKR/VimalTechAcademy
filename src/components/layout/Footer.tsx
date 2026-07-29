import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Monitor,
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Monitor className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Vimal Tech Academy</h3>
                <p className="text-xs text-slate-400">Computer Education & Technical Skill Center</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Empowering students, job seekers, and working professionals with industry-relevant computer education, hands-on lab training, and government-recognized certifications.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> ISO 9001:2015 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700">
                <Award className="w-4 h-4 text-amber-400" /> Govt. Recognized
              </span>
            </div>
          </div>

          {/* Col 2: Popular Courses */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-blue-400">
              Popular Courses
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button
                  onClick={() => navigateTo('course-detail', 'course-adca')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> ADCA (1 Year Master)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('course-detail', 'course-ccc')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> CCC (Computer Concepts)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('course-detail', 'course-tally')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Tally Prime with GST
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('course-detail', 'course-webdev')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Full-Stack Web Dev
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('course-detail', 'course-typing')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Typing (Hindi & English)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-blue-400">
              Student Portal
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <button onClick={() => navigateTo('admission')} className="hover:text-blue-400 transition-colors">
                  Online Admission Form
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('student-login')} className="hover:text-blue-400 transition-colors">
                  Student Login Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('certificates')} className="hover:text-blue-400 transition-colors">
                  Verify Certificate
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('materials')} className="hover:text-blue-400 transition-colors">
                  Study Material Downloads
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('notices')} className="hover:text-blue-400 transition-colors">
                  Notices & Exam Schedules
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 text-blue-400">
              Contact Campus
            </h4>
            <div className="space-y-2.5 text-xs font-medium text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>1st foor, near Suresh-Sakuntala Hospital, Gondwa, Atrauli-Kothawan Road, Sandila, Hardoi, Uttar Pradesh, 241203, India </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 9580295393</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>contact@vimaltechacademy.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mon - Sat: 07:00 AM - 06:00 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Vimal Tech Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('privacy')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigateTo('terms')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => navigateTo('404')} className="hover:text-slate-300 transition-colors">
              System Test 404
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
