import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  Users,
  UserPlus,
  BookOpen,
  DollarSign,
  Bell,
  Search,
  CheckCircle2,
  X,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  Lock,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    students,
    courses,
    notices,
    addNotice,
    updateStudentFee,
    updateStudentCredentials,
    addToast,
    submitAdmission,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'students' | 'courses' | 'notices'>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals state
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [selectedStudentForFee, setSelectedStudentForFee] = useState<any | null>(null);
  const [feeInput, setFeeInput] = useState(1000);

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeForm, setNoticeForm] = useState({ title: '', category: 'Exam' as const, content: '', important: false });

  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    mobile: '',
    email: '',
    dob: '2004-01-01',
    gender: 'Male',
    address: '',
    courseId: courses[0]?.id || 'course-adca',
    qualification: '12th Pass',
  });

  // Credential Management Modal State
  const [isCredsModalOpen, setIsCredsModalOpen] = useState(false);
  const [selectedStudentForCreds, setSelectedStudentForCreds] = useState<any | null>(null);
  const [credsRegNo, setCredsRegNo] = useState('');
  const [credsPassword, setCredsPassword] = useState('');
  const [showCredsPassword, setShowCredsPassword] = useState(false);

  const filteredStudents = students.filter((s) => {
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.courseTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'Active').length;
  const totalPendingFee = students.reduce((acc, curr) => acc + curr.pendingFee, 0);

  const handleFeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudentForFee && feeInput > 0) {
      updateStudentFee(selectedStudentForFee.id, feeInput);
      setIsFeeModalOpen(false);
      setSelectedStudentForFee(null);
    }
  };

  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;
    addNotice({
      title: noticeForm.title,
      category: noticeForm.category,
      content: noticeForm.content,
      date: new Date().toISOString().split('T')[0],
      important: noticeForm.important,
    });
    setIsNoticeModalOpen(false);
    setNoticeForm({ title: '', category: 'Exam', content: '', important: false });
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAdmission(newStudentForm);
    setIsAddStudentModalOpen(false);
  };

  const handleCredsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudentForCreds && credsRegNo.trim() && credsPassword.trim()) {
      updateStudentCredentials(selectedStudentForCreds.id, credsRegNo.trim(), credsPassword.trim());
      setIsCredsModalOpen(false);
      setSelectedStudentForCreds(null);
    }
  };

  const openCredsModal = (student: any) => {
    setSelectedStudentForCreds(student);
    setCredsRegNo(student.regNo);
    setCredsPassword(student.password || '123456');
    setShowCredsPassword(false);
    setIsCredsModalOpen(true);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle="Admin & Director Management Portal" />

        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <ShieldCheck className="w-4 h-4 text-indigo-400" /> Institute Administration Portal
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Vimal Tech Master Control Dashboard</h1>
            <p className="text-xs text-slate-300">
              Manage student admissions, credentials, fee receipts, course catalogs, and official notices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddStudentModalOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Student</span>
            </button>

            <button
              onClick={() => setIsNoticeModalOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4" />
              <span>Publish Notice</span>
            </button>
          </div>
        </div>

        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Enrolled</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{totalStudents}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Active Students</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">{activeStudents}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Pending Fee Balance</p>
              <p className="text-2xl font-black text-rose-600 mt-1">₹{totalPendingFee.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Active Courses</p>
              <p className="text-2xl font-black text-indigo-600 mt-1">{courses.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {[
            { id: 'students', label: 'Student & Credentials Management', icon: Users },
            { id: 'courses', label: 'Course Catalog', icon: BookOpen },
            { id: 'notices', label: 'Notices Broadcast', icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: STUDENT MANAGEMENT & CREDENTIALS TABLE */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search student by name, reg ID or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Pending Approval">Pending Approval</option>
              </select>
            </div>

            {/* Students Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-y border-slate-200">
                  <tr>
                    <th className="p-3">Student Info</th>
                    <th className="p-3">Course Enrolled</th>
                    <th className="p-3">Login Password</th>
                    <th className="p-3">Fee Status</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img src={s.photoUrl} alt={s.name} className="w-9 h-9 rounded-xl object-cover border" />
                          <div>
                            <p className="font-bold text-slate-900">{s.name}</p>
                            <p className="text-[10px] font-mono text-blue-600 font-bold">ID: {s.regNo}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3">
                        <p className="font-semibold text-slate-800 line-clamp-1">{s.courseTitle}</p>
                        <p className="text-[10px] text-slate-400">Batch: {s.batchTiming}</p>
                      </td>

                      <td className="p-3 font-mono text-slate-700">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] font-bold">
                          <Lock className="w-3 h-3 text-slate-500" />
                          {s.password || '123456'}
                        </span>
                      </td>

                      <td className="p-3">
                        <p className="font-bold text-slate-900">Paid: ₹{s.feePaid.toLocaleString()}</p>
                        {s.pendingFee > 0 ? (
                          <p className="text-[10px] font-bold text-rose-600">Pending: ₹{s.pendingFee.toLocaleString()}</p>
                        ) : (
                          <p className="text-[10px] font-bold text-emerald-600">Fully Paid</p>
                        )}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            s.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : s.status === 'Completed'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openCredsModal(s)}
                            className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] rounded-lg transition-colors border border-indigo-200 flex items-center gap-1"
                            title="Manage Login ID & Password"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Set Login</span>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedStudentForFee(s);
                              setIsFeeModalOpen(true);
                            }}
                            className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-[11px] rounded-lg transition-colors border border-blue-200"
                          >
                            Log Payment
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: COURSES CATALOG */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded">{c.category}</span>
                  <span className="text-xs font-mono font-bold text-slate-400">{c.code}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                <p className="text-xs text-slate-500">Duration: {c.duration} • Fee: ₹{c.totalFee}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: NOTICES BROADCAST */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Active Notice Circulars</h3>
            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>{n.category}</span>
                    <span>{n.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                  <p className="text-xs text-slate-600">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL 1: STUDENT LOGIN CREDENTIALS MANAGEMENT */}
        {isCredsModalOpen && selectedStudentForCreds && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Manage Student Credentials</h3>
                </div>
                <button onClick={() => setIsCredsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-100 text-xs space-y-1 text-indigo-900">
                <p>Student: <strong>{selectedStudentForCreds.name}</strong></p>
                <p className="text-[11px] text-indigo-700">Set the Login ID and Password for this student to access their portal.</p>
              </div>

              <form onSubmit={handleCredsSubmit} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Login ID (Registration No)
                  </label>
                  <input
                    type="text"
                    required
                    value={credsRegNo}
                    onChange={(e) => setCredsRegNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Login Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCredsPassword ? 'text' : 'password'}
                      required
                      value={credsPassword}
                      onChange={(e) => setCredsPassword(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCredsPassword(!showCredsPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-1"
                      title={showCredsPassword ? 'Hide password' : 'Show password'}
                    >
                      {showCredsPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Save Login Credentials to Database</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: FEE LOG DIALOG */}
        {isFeeModalOpen && selectedStudentForFee && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Log Fee Payment</h3>
                <button onClick={() => setIsFeeModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <p>Student: <strong>{selectedStudentForFee.name}</strong> ({selectedStudentForFee.regNo})</p>
                <p>Pending Balance: <strong className="text-rose-600">₹{selectedStudentForFee.pendingFee}</strong></p>
              </div>

              <form onSubmit={handleFeeSubmit} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Amount (₹)</label>
                  <input
                    type="number"
                    required
                    max={selectedStudentForFee.pendingFee}
                    value={feeInput}
                    onChange={(e) => setFeeInput(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Record Payment & Issue Receipt
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: NOTICE PUBLISHER */}
        {isNoticeModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Publish Notice Circular</h3>
                <button onClick={() => setIsNoticeModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleNoticeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Practical Exam Dates Announcement"
                    value={noticeForm.title}
                    onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={noticeForm.category}
                    onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                  >
                    <option value="Exam">Exam Schedule</option>
                    <option value="Holiday">Holiday Notice</option>
                    <option value="Placement">Placement Walk-In</option>
                    <option value="Admission">New Batch Admission</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Notice Content</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter detailed instructions for students..."
                    value={noticeForm.content}
                    onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Broadcast Notice to All Student Dashboards
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 4: ADD NEW STUDENT */}
        {isAddStudentModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Add New Student Registration</h3>
                <button onClick={() => setIsAddStudentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddStudentSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Student Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Rahul Sharma"
                      value={newStudentForm.studentName}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, studentName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Father Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ramesh Sharma"
                      value={newStudentForm.fatherName}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, fatherName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={newStudentForm.mobile}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, mobile: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Course *</label>
                    <select
                      value={newStudentForm.courseId}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, courseId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Login Password *</label>
                  <div className="relative">
                    <input
                      type={showCredsPassword ? 'text' : 'password'}
                      required
                      placeholder="Assign student login password"
                      value={credsPassword || '123456'}
                      onChange={(e) => setCredsPassword(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCredsPassword(!showCredsPassword)}
                      className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 p-0.5"
                      title={showCredsPassword ? 'Hide password' : 'Show password'}
                    >
                      {showCredsPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Save Student Record
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
