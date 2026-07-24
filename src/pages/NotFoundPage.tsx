import React from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { ArrowLeft, Home, Monitor } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="py-16 bg-slate-50 min-h-screen flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center font-bold text-2xl font-mono">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900">Page Not Found</h1>
          <p className="text-xs text-slate-500">
            The page or module you are attempting to access does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Institute Homepage</span>
          </button>

          <button
            onClick={() => navigateTo('courses')}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
          >
            Explore Courses Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
