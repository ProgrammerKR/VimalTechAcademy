import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { User, Shield, KeyRound, Sparkles, LogIn, CheckCircle2 } from 'lucide-react';

export const StudentLoginPage: React.FC = () => {
  const { loginAsDemoStudent, loginAsDemoAdmin, students, addToast, setCurrentStudent, setUserRole, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');
  const [regNoInput, setRegNoInput] = useState('VTA-2024-101');
  const [adminUser, setAdminUser] = useState('admin@vimaltechacademy.edu');
  const [password, setPassword] = useState('123456');

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = students.find((s) => s.regNo.toLowerCase() === regNoInput.trim().toLowerCase());
    if (matched) {
      setCurrentStudent(matched);
      setUserRole('student');
      addToast('success', 'Logged In Successfully', `Welcome back, ${matched.name}!`);
      navigateTo('student-dashboard');
    } else {
      addToast('error', 'Student Not Found', 'No student record found with Registration ID: ' + regNoInput);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole('admin');
    addToast('success', 'Admin Authenticated', 'Access granted to Director & Admin Panel.');
    navigateTo('admin-dashboard');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 space-y-8">
        <Breadcrumb pageTitle="Portal Authentication" />

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
          {/* Tab Switcher */}
          <div className="flex rounded-2xl bg-slate-100 p-1">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'student'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4" /> Student Portal
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4" /> Admin Portal
            </button>
          </div>

          {/* Quick Demo Switcher Alert Box */}
          <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" /> Instant Demo Sign-In
              </span>
            </div>
            <p className="text-[11px] text-blue-700">Click below to bypass manual credentials and test immediately:</p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={loginAsDemoStudent}
                className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] rounded-lg transition-colors"
              >
                Demo Student (Rahul)
              </button>
              <button
                type="button"
                onClick={loginAsDemoAdmin}
                className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] rounded-lg transition-colors"
              >
                Demo Admin
              </button>
            </div>
          </div>

          {activeTab === 'student' ? (
            /* Student Login Form */
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Registration ID / Roll No</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VTA-2024-101"
                  value={regNoInput}
                  onChange={(e) => setRegNoInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password / DOB</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Student Dashboard</span>
              </button>
            </form>
          ) : (
            /* Admin Login Form */
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Username / Email</label>
                <input
                  type="text"
                  required
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Admin Portal</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
