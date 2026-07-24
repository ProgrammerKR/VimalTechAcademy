import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  Award,
  Search,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Printer,
  QrCode,
  User,
  Calendar,
} from 'lucide-react';

export const CertificateVerificationPage: React.FC = () => {
  const { certificates } = useApp();
  const [certInput, setCertInput] = useState('CERT-VTA-8942');
  const [searchedRecord, setSearchedRecord] = useState<any | null>(certificates[0]);
  const [notFound, setNotFound] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const query = certInput.trim().toUpperCase();
    const found = certificates.find((c) => c.certificateNo.toUpperCase() === query || c.regNo.toUpperCase() === query);

    if (found) {
      setSearchedRecord(found);
      setNotFound(false);
    } else {
      setSearchedRecord(null);
      setNotFound(true);
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle="Certificate Verification Portal" />

        {/* Search Header */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Certificate Verification Engine</h1>
              <p className="text-xs text-slate-500">Official employer & student credential verification portal</p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter Certificate No (e.g. CERT-VTA-8942 or Reg No)"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500 uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verify Now</span>
            </button>
          </form>

          <div className="text-[11px] text-slate-500 flex items-center gap-2">
            <span>Sample Test Codes:</span>
            <button
              type="button"
              onClick={() => {
                setCertInput('CERT-VTA-8942');
                setSearchedRecord(certificates[0]);
                setNotFound(false);
              }}
              className="font-mono text-blue-600 hover:underline font-bold"
            >
              CERT-VTA-8942
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setCertInput('CERT-VTA-9120');
                setSearchedRecord(certificates[1]);
                setNotFound(false);
              }}
              className="font-mono text-blue-600 hover:underline font-bold"
            >
              CERT-VTA-9120
            </button>
          </div>
        </div>

        {/* Results Box */}
        {searchedRecord && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">VERIFIED GENUINE RECORD</h3>
                  <p className="text-xs text-emerald-600 font-semibold">Official ISO 9001:2015 Record Found</p>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Verification Sheet
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="md:col-span-3 text-center">
                <img
                  src={searchedRecord.photoUrl}
                  alt={searchedRecord.studentName}
                  className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-blue-600 shadow-md"
                />
                <span className="inline-block mt-2 text-[10px] font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                  Status: {searchedRecord.verificationStatus}
                </span>
              </div>

              <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Certificate Number:</span>
                  <p className="font-extrabold text-slate-900 font-mono">{searchedRecord.certificateNo}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-medium">Student Full Name:</span>
                  <p className="font-bold text-slate-900">{searchedRecord.studentName}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-medium">Father's Name:</span>
                  <p className="font-semibold text-slate-800">{searchedRecord.fatherName}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-medium">Registration No:</span>
                  <p className="font-bold text-slate-900 font-mono">{searchedRecord.regNo}</p>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-medium">Course Completed:</span>
                  <p className="font-extrabold text-blue-900">{searchedRecord.courseTitle}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-medium">Grade Awarded:</span>
                  <p className="font-black text-emerald-600">{searchedRecord.grade}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-medium">Issue Date:</span>
                  <p className="font-semibold text-slate-800">{searchedRecord.issueDate}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {notFound && (
          <div className="bg-white rounded-3xl p-8 border border-rose-200 shadow-md text-center space-y-3">
            <XCircle className="w-12 h-12 text-rose-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">Certificate Not Found</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              No official record matching <strong className="font-mono">{certInput}</strong> was found in our database. Please double check the certificate code or contact the institute office.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
