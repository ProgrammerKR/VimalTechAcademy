import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageView } from '../../types';
import {
  Monitor,
  GraduationCap,
  BookOpen,
  User,
  Shield,
  Menu,
  X,
  Search,
  PhoneCall,
  Bell,
  Award,
  ChevronDown,
  LogOut,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    userRole,
    currentStudent,
    logout,
    searchQuery,
    setSearchQuery,
    courses,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);

  const navLinks: { label: string; page: PageView; icon?: React.ReactNode }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Courses', page: 'courses' },
    { label: 'Online Admission', page: 'admission' },
    { label: 'Certificates', page: 'certificates' },
    { label: 'Notices', page: 'notices' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const filteredSearchCourses = searchQuery.trim()
    ? courses.filter(
      (c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1 bg-blue-500/30 text-blue-200 text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 border border-blue-400/30">
              <Bell className="w-3 h-3 text-amber-300 animate-pulse" /> Latest Notice
            </span>
            <p className="text-slate-200 truncate font-medium">
              New Batches Starting for Tally Prime with GST & ADCA | Admissions Open 2026-27
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-slate-300 font-medium text-[11px]">
            <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-blue-400" /> +91 9580295393
            </a>
            <span className="text-slate-600">|</span>
            <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
              Help & FAQ
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Institute Name */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Monitor className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Vimal Tech Academy
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => navigateTo(link.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Search & Login / Portal */}
          <div className="flex items-center gap-3">
            {/* Search Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                title="Search Courses & Materials"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search Dropdown Popup */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-fadeIn">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search courses (e.g. ADCA, Tally, CCC)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {filteredSearchCourses.length > 0 && (
                    <div className="mt-2 max-h-60 overflow-y-auto divide-y divide-slate-100">
                      {filteredSearchCourses.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => {
                            navigateTo('course-detail', course.id);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left p-2.5 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                              {course.title}
                            </p>
                            <p className="text-[11px] text-slate-500">{course.duration} • ₹{course.totalFee}</p>
                          </div>
                          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">View</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Portal Action Button */}
            {userRole === 'guest' ? (
              <div className="relative">
                <button
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all duration-200"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Portal Login</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {/* Login Dropdown */}
                {isLoginDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setIsLoginDropdownOpen(false)}
                  >
                    <button
                      onClick={() => {
                        navigateTo('student-login');
                        setIsLoginDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-sm font-medium text-slate-800 flex items-center gap-3 transition-colors"
                    >
                      <User className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-xs">Student Portal</p>
                        <p className="text-[11px] text-slate-500">View attendance, fees & ID card</p>
                      </div>
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        navigateTo('student-login');
                        setIsLoginDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-indigo-50 text-sm font-medium text-slate-800 flex items-center gap-3 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-xs">Admin / Staff Portal</p>
                        <p className="text-[11px] text-slate-500">Manage students & certificates</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    navigateTo(userRole === 'student' ? 'student-dashboard' : 'admin-dashboard')
                  }
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-all"
                >
                  {userRole === 'student' ? (
                    <>
                      <User className="w-4 h-4 text-blue-600" />
                      <span className="max-w-[100px] truncate">{currentStudent?.name || 'Student'}</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 text-indigo-600" />
                      <span>Admin Panel</span>
                    </>
                  )}
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                navigateTo(link.page);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${currentPage === link.page
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-700 hover:bg-slate-50'
                }`}
            >
              <span>{link.label}</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100" />
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                navigateTo('admission');
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold text-center"
            >
              Apply Online Admission
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
