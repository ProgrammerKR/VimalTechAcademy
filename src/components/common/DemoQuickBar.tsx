import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, UserCheck, ShieldCheck, Award, FileText } from 'lucide-react';

export const DemoQuickBar: React.FC = () => {
  const { navigateTo, loginAsDemoStudent, loginAsDemoAdmin, userRole } = useApp();

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shadow-inner">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-medium border border-blue-500/30">
          <Sparkles className="w-3 h-3 text-blue-400" /> Demo Portal Switcher
        </span>
        <span className="hidden md:inline text-slate-400 text-[11px]">
          Quickly test student dashboard, admin portal & certificate verification:
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={loginAsDemoStudent}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium text-[11px]"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Student Portal</span>
        </button>

        <button
          onClick={loginAsDemoAdmin}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors font-medium text-[11px]"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Admin Portal</span>
        </button>

        <button
          onClick={() => navigateTo('certificates')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium text-[11px] border border-slate-700"
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Verify Certificate</span>
        </button>

        <button
          onClick={() => navigateTo('admission')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors font-medium text-[11px] border border-slate-700"
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Online Admission</span>
        </button>
      </div>
    </div>
  );
};
