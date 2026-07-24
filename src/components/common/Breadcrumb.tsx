import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';
import { PageView } from '../../types';

interface BreadcrumbProps {
  pageTitle: string;
  category?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle, category }) => {
  const { navigateTo } = useApp();

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 py-3 mb-4 border-b border-slate-100">
      <button
        onClick={() => navigateTo('home')}
        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>
      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
      {category && (
        <>
          <span className="hover:text-slate-700">{category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        </>
      )}
      <span className="font-semibold text-slate-800">{pageTitle}</span>
    </nav>
  );
};
