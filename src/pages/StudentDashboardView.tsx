import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  User,
  GraduationCap,
  Calendar,
  CreditCard,
  BookOpen,
  Award,
  FileCheck2,
  Printer,
  QrCode,
  CheckCircle2,
  Clock,
  Download,
  DollarSign,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const StudentDashboardView: React.FC = () => {
  const { currentStudent, students, studyMaterials, notices, addToast, updateStudentFee } = useApp();

  const student = currentStudent || students[0]; // Rahul Sharma
  const [activeTab, setActiveTab] = useState<
    'overview' | 'attendance' | 'fees' | 'materials' | 'results' | 'certificate' | 'idcard'
  >('overview');

  const [payAmount, setPayAmount] = useState(student.pendingFee || 1000);

  const handlePayFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (payAmount <= 0) return;
    updateStudentFee(student.id, payAmount);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle="Student Portal" />

        {/* Student Profile Header Banner */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200/80 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <img
                src={student.photoUrl}
                alt={student.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <h1 className="text-xl font-bold text-slate-900">{student.name}</h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                    {student.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">{student.courseTitle}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-[11px] text-slate-500 font-medium">
                  <span>Reg ID: <strong className="text-slate-800 font-mono">{student.regNo}</strong></span>
                  <span>•</span>
                  <span>Roll No: <strong className="text-slate-800 font-mono">{student.rollNo}</strong></span>
                  <span>•</span>
                  <span>Batch: <strong className="text-slate-800">{student.batchTiming}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('idcard')}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>Digital ID Card</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
          {[
            { id: 'overview', label: 'Overview', icon: GraduationCap },
            { id: 'attendance', label: 'Attendance', icon: Calendar },
            { id: 'fees', label: 'Fee Portal', icon: CreditCard },
            { id: 'materials', label: 'Study Materials', icon: BookOpen },
            { id: 'results', label: 'Exam Results', icon: FileCheck2 },
            { id: 'certificate', label: 'Certificate', icon: Award },
            { id: 'idcard', label: 'Print Student ID', icon: QrCode },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Quick Analytics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">{student.attendancePercentage}%</p>
                  <p className="text-xs font-semibold text-slate-500">Attendance Rate</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">₹{student.feePaid.toLocaleString()}</p>
                  <p className="text-xs font-semibold text-slate-500">Total Fee Paid</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">₹{student.pendingFee.toLocaleString()}</p>
                  <p className="text-xs font-semibold text-slate-500">Pending Fee Balance</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">{student.grade || 'A+'}</p>
                  <p className="text-xs font-semibold text-slate-500">Exam Grade</p>
                </div>
              </div>
            </div>

            {/* Course Summary & Recent Notices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">My Course Progress</h3>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Enrolled Program:</span>
                    <span className="font-bold text-slate-800">{student.courseTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Admission Date:</span>
                    <span className="font-semibold text-slate-800">{student.admissionDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Class Room:</span>
                    <span className="font-semibold text-slate-800">Lab 1 (Station #14)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Instructor:</span>
                    <span className="font-semibold text-slate-800">Er. R.K. Verma</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Notice Board Alerts</h3>
                <div className="space-y-3">
                  {notices.slice(0, 3).map((n) => (
                    <div key={n.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
                        <span>{n.category}</span>
                        <span>{n.date}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">{n.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Lab Attendance Register</h3>
                <p className="text-xs text-slate-500">Monthly biometric & digital login record for {student.name}</p>
              </div>
              <span className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-extrabold rounded-xl border border-emerald-200">
                {student.attendancePercentage}% Overall Attendance
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center">
              {[...Array(28)].map((_, i) => {
                const day = i + 1;
                const isAbsent = day === 6 || day === 19;
                const isSunday = day % 7 === 0;

                return (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-xs font-semibold ${
                      isSunday
                        ? 'bg-slate-100 text-slate-400 border-slate-200'
                        : isAbsent
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    <p className="text-[10px] uppercase font-mono text-slate-400">Day {day}</p>
                    <p className="text-sm font-extrabold mt-1">{isSunday ? 'SUN' : isAbsent ? 'ABSENT' : 'PRESENT'}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: FEE PORTAL & RECEIPT */}
        {activeTab === 'fees' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Fee Status & Receipt</h3>
                <p className="text-xs text-slate-500">Manage monthly fee payments and download official tax receipts</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-semibold">Total Fee: ₹{student.totalFee}</p>
                <p className="text-base font-extrabold text-emerald-600">Paid: ₹{student.feePaid}</p>
              </div>
            </div>

            {student.pendingFee > 0 ? (
              <div className="p-6 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-4">
                <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Pending Fee Balance: ₹{student.pendingFee}
                </h4>

                <form onSubmit={handlePayFee} className="flex items-center gap-3 max-w-md">
                  <input
                    type="number"
                    max={student.pendingFee}
                    value={payAmount}
                    onChange={(e) => setPayAmount(Number(e.target.value))}
                    className="px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Pay Online Now (Simulated)
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Full Fee Cleared! No pending balance remaining.</span>
              </div>
            )}

            {/* Fee Receipt Preview (Printable) */}
            <div className="border border-slate-200 p-6 rounded-2xl bg-slate-50/60 space-y-4 print:bg-white print:border-none">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Official Fee Receipt #REC-2026-9041</h4>
                  <p className="text-[11px] text-slate-500">Vimal Tech Academy</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Fee Receipt
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Student Name:</span>
                  <p className="font-bold text-slate-900">{student.name}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Registration No:</span>
                  <p className="font-bold text-slate-900 font-mono">{student.regNo}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Course:</span>
                  <p className="font-bold text-slate-900">{student.courseTitle}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Amount Paid:</span>
                  <p className="font-extrabold text-emerald-600">₹{student.feePaid}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Payment Mode:</span>
                  <p className="font-semibold text-slate-800">Online UPI / Cash</p>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Received By:</span>
                  <p className="font-semibold text-slate-800">Accounts Office</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: STUDY MATERIALS */}
        {activeTab === 'materials' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Course Study Materials & E-Books
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between hover:border-blue-300 transition-all"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                      {mat.type} • {mat.fileSize}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-2">{mat.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Added on: {mat.addedDate}</p>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast('info', 'Downloading Material', `Started download for ${mat.title}`);
                    }}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: EXAM RESULTS */}
        {activeTab === 'results' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Term Exam Results & Mark Sheet</h3>
                <p className="text-xs text-slate-500">Official marks breakdown for {student.name}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs rounded-lg border border-emerald-200">
                STATUS: PASS ({student.grade || 'A+'})
              </span>
            </div>

            <div className="max-w-2xl bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center border-b border-slate-200 pb-3">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Theory Exam</p>
                  <p className="text-lg font-black text-slate-900">88 / 100</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Practical Lab</p>
                  <p className="text-lg font-black text-slate-900">94 / 100</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Viva Voice</p>
                  <p className="text-lg font-black text-slate-900">18 / 20</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Total Aggregated Percentage:</span>
                <span className="text-base text-blue-600 font-extrabold">92% (A+ Grade)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: CERTIFICATE VIEW (PRINTABLE) */}
        {activeTab === 'certificate' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Official ISO Certified Certificate</h3>
                <p className="text-xs text-slate-500">Golden Seal verified diploma certificate</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print / Download Certificate
              </button>
            </div>

            {/* Printable Gold Border Certificate Frame */}
            <div className="relative border-8 border-double border-amber-500/80 p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20 shadow-2xl text-center space-y-6">
              <div className="flex items-center justify-between border-b-2 border-amber-400/40 pb-4">
                <span className="text-[10px] font-mono text-slate-400">CERT NO: {student.certificateNo || 'CERT-VTA-8942'}</span>
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">ISO 9001:2015 CERTIFIED</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide">
                  Vimal Tech Academy
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Government Recognized Computer Education Center</p>
              </div>

              <div className="py-2">
                <p className="text-xs italic text-slate-600">This is to certify that</p>
                <h3 className="text-2xl font-bold text-blue-900 underline underline-offset-8 decoration-amber-500 my-2">
                  {student.name}
                </h3>
                <p className="text-xs text-slate-600">
                  Son/Daughter of <strong className="text-slate-800">{student.fatherName}</strong>, Registration No:{' '}
                  <strong className="font-mono text-slate-800">{student.regNo}</strong>
                </p>
              </div>

              <div className="max-w-xl mx-auto py-2">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  has successfully completed the prescribed course of study in{' '}
                  <strong className="text-slate-900 underline">{student.courseTitle}</strong> and passed the final examination with Grade{' '}
                  <strong className="text-blue-700">{student.grade || 'A+'}</strong>.
                </p>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-amber-300/60 max-w-xl mx-auto">
                <div className="text-left text-[11px] text-slate-600">
                  <p className="font-bold text-slate-900">Issue Date:</p>
                  <p>20th Dec 2024</p>
                </div>

                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-amber-500 flex items-center justify-center shadow-lg border-2 border-amber-600">
                  <Award className="w-8 h-8 text-amber-950" />
                </div>

                <div className="text-right text-[11px] text-slate-600">
                  <p className="font-bold text-slate-900">Director Signature</p>
                  <p className="italic font-serif text-blue-900">Er. R.K. Verma</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: ID CARD VIEW (PRINTABLE) */}
        {activeTab === 'idcard' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Digital Student ID Card</h3>
                <p className="text-xs text-slate-500">Official campus entry ID badge with QR code</p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print ID Badge
              </button>
            </div>

            {/* ID Card Display Frame */}
            <div className="max-w-sm mx-auto bg-gradient-to-b from-blue-900 to-indigo-900 text-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-300 p-6 space-y-4 print:shadow-none">
              <div className="text-center border-b border-blue-800/80 pb-3">
                <h3 className="text-base font-extrabold tracking-tight">Vimal Tech Academy</h3>
                <p className="text-[10px] text-blue-300 uppercase tracking-widest font-semibold">Student Identity Badge</p>
              </div>

              <div className="text-center space-y-2">
                <img
                  src={student.photoUrl}
                  alt={student.name}
                  className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-white shadow-md"
                />
                <h4 className="text-lg font-bold text-white leading-tight">{student.name}</h4>
                <p className="text-xs font-semibold text-blue-200">{student.courseTitle}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-[11px] space-y-1.5 font-medium">
                <div className="flex justify-between">
                  <span className="text-blue-300">Reg No:</span>
                  <span className="font-bold font-mono">{student.regNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Roll No:</span>
                  <span className="font-bold font-mono">{student.rollNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Mobile:</span>
                  <span>{student.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-300">Batch:</span>
                  <span>{student.batchTiming}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-blue-800/80">
                <div className="bg-white p-1 rounded-lg">
                  <QrCode className="w-10 h-10 text-slate-900" />
                </div>
                <div className="text-right text-[10px] text-blue-200">
                  <p className="font-bold text-white">Authorized Sign</p>
                  <p className="italic font-serif">Director Admin</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
