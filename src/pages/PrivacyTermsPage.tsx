import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ShieldCheck, FileText } from 'lucide-react';

export const PrivacyTermsPage: React.FC<{ mode: 'privacy' | 'terms' }> = ({ mode }) => {
  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle={mode === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'} />

        <div className="bg-white p-8 lg:p-12 rounded-3xl border border-slate-200/80 shadow-md space-y-6 text-slate-700 leading-relaxed text-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              {mode === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {mode === 'privacy' ? 'Institute Privacy Policy' : 'Terms & Conditions of Enrollment'}
              </h1>
              <p className="text-xs text-slate-500">Effective Date: January 1, 2026 • Vimal Tech Academy</p>
            </div>
          </div>

          {mode === 'privacy' ? (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">1. Information We Collect</h3>
              <p>
                When you submit an online admission form or enquiry at Vimal Tech Academy, we collect personal credentials such as your full name, guardian name, mobile number, email address, date of birth, educational qualification, and photo.
              </p>

              <h3 className="text-sm font-bold text-slate-900">2. Usage of Student Information</h3>
              <p>
                Student data is exclusively utilized for institute registration, generating hall tickets, issuing ISO certified course completion certificates, maintaining lab attendance registers, and sending examination circulars.
              </p>

              <h3 className="text-sm font-bold text-slate-900">3. Data Security & Confidentiality</h3>
              <p>
                We maintain strict administrative and electronic safeguards. Student credentials are never sold or rented to third-party commercial vendors.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">1. Student Conduct & Lab Discipline</h3>
              <p>
                All enrolled students must wear their official Vimal Tech Academy Identity Card while on campus premises. Food, beverages, or unauthorized USB device connections in computer labs are strictly prohibited.
              </p>

              <h3 className="text-sm font-bold text-slate-900">2. Attendance Requirement</h3>
              <p>
                A minimum of 75% lab and theory class attendance is mandatory for appearing in term final examinations and receiving ISO course completion certificates.
              </p>

              <h3 className="text-sm font-bold text-slate-900">3. Fee Payment Policy</h3>
              <p>
                Monthly course fees must be paid on or before the 10th of every calendar month. Admission fees and prospectus charges are non-refundable once enrollment is confirmed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
