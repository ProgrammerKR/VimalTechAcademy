import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { BookOpen, Download, Search, FileText, Video, Code, FileCode } from 'lucide-react';

export const StudyMaterialsPage: React.FC = () => {
  const { studyMaterials, courses, addToast } = useApp();
  const [filterCourse, setFilterCourse] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = studyMaterials.filter((m) => {
    const matchesCourse = filterCourse === 'All' || m.courseId === filterCourse;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb pageTitle="Study Materials & E-Library" />

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Digital E-Library & Study Materials</h1>
            <p className="text-xs text-slate-500 mt-1">Download official course hand-outs, PDF notes, and typing test papers.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search notes title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
            >
              <option value="All">All Courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((mat) => (
            <div
              key={mat.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {mat.type}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">{mat.fileSize}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{mat.title}</h3>
                <p className="text-[11px] text-slate-400">Added on: {mat.addedDate}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-semibold">Free Download</span>
                <button
                  onClick={() => addToast('success', 'Download Started', `Downloading ${mat.title}`)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
