export type PageView =
  | 'home'
  | 'about'
  | 'courses'
  | 'course-detail'
  | 'admission'
  | 'student-login'
  | 'student-dashboard'
  | 'materials'
  | 'attendance'
  | 'fees'
  | 'results'
  | 'certificates'
  | 'gallery'
  | 'notices'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'admin-dashboard'
  | '404';

export type UserRole = 'guest' | 'student' | 'admin';

export interface Course {
  id: string;
  code: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Certificate' | 'Diploma' | 'Advanced Diploma' | 'Specialized Skill';
  duration: string;
  durationMonths: number;
  hoursPerDay: string;
  eligibility: string;
  totalFee: number;
  monthlyFee?: number;
  admissionFee: number;
  discountPercentage?: number;
  syllabus: { moduleTitle: string; topics: string[] }[];
  features: string[];
  careerOpportunities: string[];
  iconName: string;
  isPopular?: boolean;
  colorTheme: string;
}

export interface Student {
  id: string;
  regNo: string;
  rollNo: string;
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  email: string;
  address: string;
  courseId: string;
  courseTitle: string;
  batchTiming: string;
  qualification: string;
  admissionDate: string;
  photoUrl: string;
  status: 'Active' | 'Completed' | 'Pending Approval' | 'Suspended';
  attendancePercentage: number;
  feePaid: number;
  totalFee: number;
  pendingFee: number;
  lastPaymentDate?: string;
  certificateIssued: boolean;
  certificateNo?: string;
  grade?: 'A+' | 'A' | 'B+' | 'B' | 'C';
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  courseId: string;
  qualification: string;
  submittedAt: string;
  status: 'Submitted' | 'Verified' | 'Approved' | 'Rejected';
  tempRegId: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Exam' | 'Holiday' | 'Admission' | 'Placement' | 'Event';
  date: string;
  content: string;
  important?: boolean;
  attachmentUrl?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  courseId: string;
  type: 'PDF' | 'Notes' | 'Video' | 'Practice Set' | 'Software';
  fileSize: string;
  addedDate: string;
  downloadUrl: string;
}

export interface ExamResult {
  studentRegNo: string;
  studentName: string;
  courseTitle: string;
  examMonth: string;
  theoryMarks: number;
  practicalMarks: number;
  vivaMarks: number;
  totalMarks: number;
  percentage: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'Fail';
  resultStatus: 'PASS' | 'FAIL';
  issueDate: string;
}

export interface CertificateRecord {
  certificateNo: string;
  studentName: string;
  fatherName: string;
  regNo: string;
  courseTitle: string;
  duration: string;
  issueDate: string;
  grade: string;
  instituteCode: string;
  verificationStatus: 'VERIFIED' | 'INVALID';
  photoUrl: string;
}

export interface FeeReceipt {
  receiptNo: string;
  studentRegNo: string;
  studentName: string;
  courseTitle: string;
  amountPaid: number;
  paymentMode: 'Cash' | 'UPI' | 'Card' | 'NetBanking';
  paymentDate: string;
  transactionRef: string;
  remainingBalance: number;
  receivedBy: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Labs' | 'Events' | 'Awards' | 'Classrooms';
  imageUrl: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  designation: string;
  company: string;
  review: string;
  rating: number;
  photoUrl: string;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  specialization: string;
  photoUrl: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}
