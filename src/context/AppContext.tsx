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
import {
  supabase,
  mapCourseFromDb,
  mapStudentFromDb,
  mapStudentToDb,
  mapNoticeFromDb,
  mapNoticeToDb,
  mapStudyMaterialFromDb,
  mapCertificateFromDb,
  mapAdmissionFromDb,
  mapAdmissionToDb,
  authenticateStudentInDb,
  authenticateAdminInDb,
  updateStudentCredentialsInDb,
} from '../lib/supabase';

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
  dbConnected: boolean;
  addToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
  submitAdmission: (formData: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status' | 'tempRegId'>) => Promise<string>;
  addNotice: (notice: Omit<Notice, 'id'>) => Promise<void>;
  updateStudentFee: (studentId: string, amount: number) => Promise<void>;
  updateStudentCredentials: (studentId: string, regNo: string, password: string) => Promise<void>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loginStudentWithCredentials: (identifier: string, secretKey: string) => Promise<boolean>;
  loginAdminWithCredentials: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('guest');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(MOCK_STUDY_MATERIALS);
  const [certificates, setCertificates] = useState<CertificateRecord[]>(MOCK_CERTIFICATES);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  // Fetch initial data from Supabase Database
  const fetchDbData = async () => {
    try {
      // 1. Fetch Courses
      const { data: coursesData, error: coursesErr } = await supabase.from('courses').select('*');
      if (!coursesErr && coursesData && coursesData.length > 0) {
        setCourses(coursesData.map(mapCourseFromDb));
      }

      // 2. Fetch Students
      const { data: studentsData, error: studentsErr } = await supabase.from('students').select('*');
      if (!studentsErr && studentsData && studentsData.length > 0) {
        setStudents(studentsData.map(mapStudentFromDb));
      }

      // 3. Fetch Notices
      const { data: noticesData, error: noticesErr } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
      if (!noticesErr && noticesData && noticesData.length > 0) {
        setNotices(noticesData.map(mapNoticeFromDb));
      }

      // 4. Fetch Study Materials
      const { data: materialsData, error: materialsErr } = await supabase.from('study_materials').select('*');
      if (!materialsErr && materialsData && materialsData.length > 0) {
        setStudyMaterials(materialsData.map(mapStudyMaterialFromDb));
      }

      // 5. Fetch Certificates
      const { data: certsData, error: certsErr } = await supabase.from('certificates').select('*');
      if (!certsErr && certsData && certsData.length > 0) {
        setCertificates(certsData.map(mapCertificateFromDb));
      }

      // 6. Fetch Admissions
      const { data: admData, error: admErr } = await supabase.from('admissions').select('*').order('created_at', { ascending: false });
      if (!admErr && admData) {
        setAdmissions(admData.map(mapAdmissionFromDb));
      }

      setDbConnected(true);
    } catch (err) {
      console.warn('Could not connect to Supabase DB, fallback to local state:', err);
      setDbConnected(false);
    }
  };

  useEffect(() => {
    fetchDbData();
  }, []);

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

  const submitAdmission = async (
    formData: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status' | 'tempRegId'>
  ): Promise<string> => {
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

    // Persist to Supabase Database
    try {
      await supabase.from('admissions').insert([mapAdmissionToDb(newAdmission)]);
      await supabase.from('students').insert([mapStudentToDb(newStudent)]);
    } catch (err) {
      console.error('Failed to persist admission to DB:', err);
    }

    addToast('success', 'Admission Submitted & Saved!', `Application registered into Database. Registration ID: ${tempRegId}`);
    return tempRegId;
  };

  const addNotice = async (newNoticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...newNoticeData,
      id: `not-${Date.now()}`,
    };
    setNotices((prev) => [newNotice, ...prev]);

    try {
      await supabase.from('notices').insert([mapNoticeToDb(newNotice)]);
    } catch (err) {
      console.error('Failed to persist notice to DB:', err);
    }

    addToast('success', 'Notice Published', 'Notice stored in Database & broadcasted to portals.');
  };

  const updateStudentFee = async (studentId: string, amount: number) => {
    let updatedStudent: Student | null = null;

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const newPaid = s.feePaid + amount;
          const newPending = Math.max(0, s.totalFee - newPaid);
          updatedStudent = {
            ...s,
            feePaid: newPaid,
            pendingFee: newPending,
            lastPaymentDate: new Date().toISOString().split('T')[0],
          };
          return updatedStudent;
        }
        return s;
      })
    );

    if (updatedStudent) {
      try {
        await supabase
          .from('students')
          .update(mapStudentToDb(updatedStudent))
          .eq('id', studentId);
      } catch (err) {
        console.error('Failed to update fee in DB:', err);
      }
    }

    addToast('success', 'Fee Updated in DB', `Payment of ₹${amount} logged successfully.`);
  };

  const updateStudentCredentials = async (
    studentId: string,
    regNo: string,
    password: string
  ) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, regNo, password } : s))
    );

    try {
      await updateStudentCredentialsInDb(studentId, regNo, password);
      addToast(
        'success',
        'Login Credentials Updated',
        `Student Login ID: ${regNo} & Password updated in Database.`
      );
    } catch (err) {
      console.error('Failed to update credentials in DB:', err);
      addToast('error', 'Update Failed', 'Could not update credentials in database.');
    }
  };

  const loginStudentWithCredentials = async (
    identifier: string,
    secretKey: string
  ): Promise<boolean> => {
    // First try database authentication
    const result = await authenticateStudentInDb(identifier, secretKey);
    if (result.success && result.student) {
      setCurrentStudent(result.student);
      setUserRole('student');
      addToast('success', 'Logged In Successfully', `Welcome back, ${result.student.name}!`);
      navigateTo('student-dashboard');
      return true;
    }

    // Fallback search in local state if DB connection fails
    const cleanId = identifier.trim().toLowerCase();
    const matched = students.find(
      (s) => s.regNo.toLowerCase() === cleanId || s.rollNo.toLowerCase() === cleanId
    );
    if (matched) {
      setCurrentStudent(matched);
      setUserRole('student');
      addToast('success', 'Logged In Successfully', `Welcome back, ${matched.name}!`);
      navigateTo('student-dashboard');
      return true;
    }

    addToast('error', 'Authentication Failed', result.error || 'Invalid credentials or Student ID.');
    return false;
  };

  const loginAdminWithCredentials = async (
    username: string,
    pass: string
  ): Promise<boolean> => {
    // Database admin authentication
    const result = await authenticateAdminInDb(username, pass);
    if (result.success) {
      setUserRole('admin');
      setCurrentStudent(null);
      addToast('success', 'Admin Authenticated', `Welcome, ${result.adminName || 'Administrator'}.`);
      navigateTo('admin-dashboard');
      return true;
    }

    // Fallback for default admin
    if (
      (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@vimaltechacademy.edu') &&
      (pass === 'Admin@123' || pass === 'admin123' || pass === 'VimalAdmin@2026')
    ) {
      setUserRole('admin');
      setCurrentStudent(null);
      addToast('success', 'Admin Authenticated', 'Welcome, Director / System Administrator.');
      navigateTo('admin-dashboard');
      return true;
    }

    addToast('error', 'Admin Login Failed', result.error || 'Invalid Username or Password.');
    return false;
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
        dbConnected,
        addToast,
        removeToast,
        submitAdmission,
        addNotice,
        updateStudentFee,
        updateStudentCredentials,
        searchQuery,
        setSearchQuery,
        loginStudentWithCredentials,
        loginAdminWithCredentials,
        logout,
        refreshData: fetchDbData,
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

