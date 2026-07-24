import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  GraduationCap,
  Upload,
  CheckCircle2,
  Printer,
  Sparkles,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
} from 'lucide-react';

export const OnlineAdmissionPage: React.FC = () => {
  const { courses, submitAdmission, navigateTo } = useApp();

  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    motherName: '',
    mobile: '',
    email: '',
    dob: '2004-05-15',
    gender: 'Male',
    address: '',
    courseId: courses[0]?.id || 'course-adca',
    qualification: '12th Pass',
  });

  const [photoPreview, setPhotoPreview] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  );
  const [docUploaded, setDocUploaded] = useState(false);
  const [submittedRegId, setSubmittedRegId] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhotoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.fatherName || !formData.mobile) {
      alert('Please fill out all mandatory fields: Student Name, Father Name, Mobile.');
      return;
    }

    const regId = submitAdmission(formData);
    setSubmittedRegId(regId);
  };

  const selectedCourse = courses.find((c) => c.id === formData.courseId) || courses[0];

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle="Online Admission Form" />

        {/* Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Student Admission Portal</h1>
              <p className="text-xs text-slate-500">Fill in the student credentials below to register for the 2026-27 academic session.</p>
            </div>
          </div>
        </div>

        {submittedRegId ? (
          /* SUCCESS ACKNOWLEDGEMENT RECEIPT CARD */
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200/80 shadow-xl space-y-6 text-center animate-fadeIn print:shadow-none print:border-none">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-widest">
                Admission Application Confirmed
              </span>
              <h2 className="text-2xl font-black text-slate-900">Registration Successful!</h2>
              <p className="text-xs text-slate-600">Your temporary Registration ID has been generated below.</p>
            </div>

            <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-left">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-medium">Temp Reg ID:</span>
                <span className="text-sm font-black text-blue-600 font-mono">{submittedRegId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-medium">Student Name:</span>
                <span className="text-xs font-bold text-slate-900">{formData.studentName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-medium">Father's Name:</span>
                <span className="text-xs font-semibold text-slate-800">{formData.fatherName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs text-slate-500 font-medium">Enrolled Course:</span>
                <span className="text-xs font-semibold text-slate-800">{selectedCourse.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Admission Fee Due:</span>
                <span className="text-xs font-bold text-emerald-600">₹{selectedCourse.admissionFee}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Please bring a copy of this acknowledgment receipt along with 2 passport photos and original educational mark sheets to the campus office within 3 days.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 print:hidden">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Acknowledgment Receipt</span>
              </button>

              <button
                onClick={() => navigateTo('student-login')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Go to Student Portal
              </button>
            </div>
          </div>
        ) : (
          /* FORM VIEW */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-8">
            {/* Section 1: Personal Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <User className="w-4 h-4" /> 1. Personal Credentials
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Father's Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sharma"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sunita Sharma"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    placeholder="House No., Street, Sector, City, Pin Code"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Course & Qualification */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> 2. Course Selection & Qualification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Course *</label>
                  <select
                    value={formData.courseId}
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.duration}) - ₹{c.totalFee}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Educational Qualification</label>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    <option value="10th Pass">10th Pass</option>
                    <option value="12th Pass">12th Pass (Arts/Science/Commerce)</option>
                    <option value="Graduate">Graduate (B.A / B.Com / B.Sc)</option>
                    <option value="Post Graduate">Post Graduate / Diploma</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Photo & Document Upload Simulation */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <Upload className="w-4 h-4" /> 3. Student Photo & Documents
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <img
                    src={photoPreview}
                    alt="Student Photo Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-300"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800 mb-1">Upload Passport Photo</p>
                    <label className="inline-block px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-500 rounded-lg text-[11px] font-semibold text-slate-700 cursor-pointer transition-colors shadow-2xs">
                      <span>Choose Photo</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-800 mb-0.5">Upload Marksheet / ID</p>
                    <p className="text-[10px] text-slate-500">Aadhaar Card or 10th/12th Mark sheet PDF</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocUploaded(!docUploaded)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      docUploaded
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {docUploaded ? '✓ Document Uploaded' : 'Simulate Upload'}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-end gap-4 border-t border-slate-100">
              <button
                type="submit"
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Submit Admission Form</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
