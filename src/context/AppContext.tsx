import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageView,
  UserRole,
  Student,
  Course,
  Notice,
  StudyMaterial,
  CertificateRecord,
  ToastMessage,
  AdmissionApplication,
} from '../types';
import {
  MOCK_COURSES,
  MOCK_STUDENTS,
  MOCK_NOTICES,
  MOCK_STUDY_MATERIALS,
  MOCK_CERTIFICATES,
} from '../data/mockData';

interface AppContextType {
  currentPage: PageView;
  navigateTo: (page: PageView, paramId?: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentStudent: Student | null;
  setCurrentStudent: (student: Student | null) => void;
  students: Student[];
  courses: Course[];
  notices: Notice[];
  studyMaterials: StudyMaterial[];
  certificates: CertificateRecord[];
  admissions: AdmissionApplication[];
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
  submitAdmission: (formData: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status' | 'tempRegId'>) => string;
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  updateStudentFee: (studentId: string, amount: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loginAsDemoStudent: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [courses] = useState<Course[]>(MOCK_COURSES);
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
  const [studyMaterials] = useState<StudyMaterial[]>(MOCK_STUDY_MATERIALS);
  const [certificates] = useState<CertificateRecord[]>(MOCK_CERTIFICATES);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top when page changes
  const navigateTo = (page: PageView, paramId?: string) => {
    if (paramId && page === 'course-detail') {
      setSelectedCourseId(paramId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const submitAdmission = (formData: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status' | 'tempRegId'>) => {
    const tempRegId = `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAdmission: AdmissionApplication = {
      ...formData,
      id: `adm-${Date.now()}`,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      tempRegId,
    };
    setAdmissions((prev) => [newAdmission, ...prev]);

    // Also add to students list as pending
    const matchedCourse = courses.find((c) => c.id === formData.courseId);
    const newStudent: Student = {
      id: `stud-${Date.now()}`,
      regNo: tempRegId,
      rollNo: `26${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.studentName,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      dob: formData.dob,
      gender: formData.gender as 'Male' | 'Female' | 'Other',
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      courseId: formData.courseId,
      courseTitle: matchedCourse ? matchedCourse.title : 'Computer Course',
      batchTiming: '09:00 AM - 10:30 AM',
      qualification: formData.qualification,
      admissionDate: new Date().toISOString().split('T')[0],
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      status: 'Pending Approval',
      attendancePercentage: 100,
      feePaid: matchedCourse ? matchedCourse.admissionFee : 500,
      totalFee: matchedCourse ? matchedCourse.totalFee : 5000,
      pendingFee: matchedCourse ? matchedCourse.totalFee - matchedCourse.admissionFee : 4500,
      certificateIssued: false,
    };

    setStudents((prev) => [newStudent, ...prev]);
    addToast('success', 'Admission Submitted!', `Application received. Registration ID: ${tempRegId}`);
    return tempRegId;
  };

  const addNotice = (newNoticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...newNoticeData,
      id: `not-${Date.now()}`,
    };
    setNotices((prev) => [newNotice, ...prev]);
    addToast('success', 'Notice Published', 'Notice has been broadcasted to student portals.');
  };

  const updateStudentFee = (studentId: string, amount: number) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const newPaid = s.feePaid + amount;
          const newPending = Math.max(0, s.totalFee - newPaid);
          return {
            ...s,
            feePaid: newPaid,
            pendingFee: newPending,
            lastPaymentDate: new Date().toISOString().split('T')[0],
          };
        }
        return s;
      })
    );
    addToast('success', 'Fee Updated', `Payment of ₹${amount} logged successfully.`);
  };

  const loginAsDemoStudent = () => {
    const demoStudent = students[0]; // Rahul Sharma
    setCurrentStudent(demoStudent);
    setUserRole('student');
    addToast('info', 'Logged In as Student', `Welcome back, ${demoStudent.name}!`);
    navigateTo('student-dashboard');
  };

  const loginAsDemoAdmin = () => {
    setUserRole('admin');
    setCurrentStudent(null);
    addToast('info', 'Admin Portal Access', 'Welcome, Director / System Administrator.');
    navigateTo('admin-dashboard');
  };

  const logout = () => {
    setUserRole('guest');
    setCurrentStudent(null);
    addToast('info', 'Logged Out', 'You have been logged out safely.');
    navigateTo('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedCourseId,
        setSelectedCourseId,
        userRole,
        setUserRole,
        currentStudent,
        setCurrentStudent,
        students,
        courses,
        notices,
        studyMaterials,
        certificates,
        admissions,
        toasts,
        addToast,
        removeToast,
        submitAdmission,
        addNotice,
        updateStudentFee,
        searchQuery,
        setSearchQuery,
        loginAsDemoStudent,
        loginAsDemoAdmin,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
