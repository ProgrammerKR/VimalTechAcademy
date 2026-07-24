/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { DemoQuickBar } from './components/common/DemoQuickBar';
import { ToastContainer } from './components/common/ToastContainer';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { BackToTop } from './components/common/BackToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { OnlineAdmissionPage } from './pages/OnlineAdmissionPage';
import { StudentLoginPage } from './pages/StudentLoginPage';
import { StudentDashboardView } from './pages/StudentDashboardView';
import { StudyMaterialsPage } from './pages/StudyMaterialsPage';
import { NoticesPage } from './pages/NoticesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyTermsPage } from './pages/PrivacyTermsPage';
import { AdminDashboardView } from './pages/AdminDashboardView';
import { CertificateVerificationPage } from './pages/CertificateVerificationPage';
import { NotFoundPage } from './pages/NotFoundPage';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'courses':
        return <CoursesPage />;
      case 'course-detail':
        return <CourseDetailPage />;
      case 'admission':
        return <OnlineAdmissionPage />;
      case 'student-login':
        return <StudentLoginPage />;
      case 'student-dashboard':
        return <StudentDashboardView />;
      case 'materials':
        return <StudyMaterialsPage />;
      case 'attendance':
      case 'fees':
      case 'results':
        return <StudentDashboardView />;
      case 'certificates':
        return <CertificateVerificationPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'notices':
        return <NoticesPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'privacy':
        return <PrivacyTermsPage mode="privacy" />;
      case 'terms':
        return <PrivacyTermsPage mode="terms" />;
      case 'admin-dashboard':
        return <AdminDashboardView />;
      case '404':
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <DemoQuickBar />
      <Header />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <ToastContainer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
