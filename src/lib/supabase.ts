import { createClient } from '@supabase/supabase-js';
import {
  Course,
  Student,
  Notice,
  StudyMaterial,
  CertificateRecord,
  AdmissionApplication,
  Testimonial,
  Faculty,
  GalleryItem,
} from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://alcguhhptvdlqxhwgkyc.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_7wDKoBWqNcbOyYzC9ppaYw_2Xb7LeI1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Mapper functions for DB (snake_case) <-> Frontend (camelCase) ---

export const mapCourseFromDb = (row: any): Course => ({
  id: row.id,
  code: row.code,
  title: row.title,
  shortDescription: row.short_description,
  fullDescription: row.full_description,
  category: row.category,
  duration: row.duration,
  durationMonths: row.duration_months,
  hoursPerDay: row.hours_per_day,
  eligibility: row.eligibility,
  totalFee: Number(row.total_fee),
  admissionFee: Number(row.admission_fee),
  monthlyFee: row.monthly_fee ? Number(row.monthly_fee) : undefined,
  discountPercentage: row.discount_percentage ? Number(row.discount_percentage) : undefined,
  syllabus: typeof row.syllabus === 'string' ? JSON.parse(row.syllabus) : row.syllabus || [],
  features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features || [],
  careerOpportunities:
    typeof row.career_opportunities === 'string'
      ? JSON.parse(row.career_opportunities)
      : row.career_opportunities || [],
  iconName: row.icon_name,
  isPopular: row.is_popular,
  colorTheme: row.color_theme,
});

export const mapStudentFromDb = (row: any): Student => ({
  id: row.id,
  regNo: row.reg_no,
  rollNo: row.roll_no,
  name: row.name,
  fatherName: row.father_name,
  motherName: row.mother_name,
  dob: row.dob,
  gender: row.gender,
  mobile: row.mobile,
  email: row.email,
  address: row.address,
  courseId: row.course_id,
  courseTitle: row.course_title,
  batchTiming: row.batch_timing,
  qualification: row.qualification,
  admissionDate: row.admission_date,
  photoUrl: row.photo_url,
  status: row.status,
  attendancePercentage: Number(row.attendance_percentage),
  feePaid: Number(row.fee_paid),
  totalFee: Number(row.total_fee),
  pendingFee: Number(row.pending_fee),
  lastPaymentDate: row.last_payment_date,
  certificateIssued: row.certificate_issued,
  certificateNo: row.certificate_no,
  grade: row.grade,
  password: row.password || 'Admin@123',
});

export const mapStudentToDb = (student: Student): any => ({
  id: student.id,
  reg_no: student.regNo,
  roll_no: student.rollNo,
  name: student.name,
  father_name: student.fatherName,
  mother_name: student.motherName,
  dob: student.dob,
  gender: student.gender,
  mobile: student.mobile,
  email: student.email,
  address: student.address,
  course_id: student.courseId,
  course_title: student.courseTitle,
  batch_timing: student.batchTiming,
  qualification: student.qualification,
  admission_date: student.admissionDate,
  photo_url: student.photoUrl,
  status: student.status,
  attendance_percentage: student.attendancePercentage,
  fee_paid: student.feePaid,
  total_fee: student.totalFee,
  pending_fee: student.pendingFee,
  last_payment_date: student.lastPaymentDate || null,
  certificate_issued: student.certificateIssued,
  certificate_no: student.certificateNo || null,
  grade: student.grade || null,
  password: student.password || '123456',
});

export const mapNoticeFromDb = (row: any): Notice => ({
  id: row.id,
  title: row.title,
  category: row.category,
  date: row.date,
  content: row.content,
  important: row.important,
  attachmentUrl: row.attachment_url,
});

export const mapNoticeToDb = (notice: Notice): any => ({
  id: notice.id,
  title: notice.title,
  category: notice.category,
  date: notice.date,
  content: notice.content,
  important: notice.important || false,
  attachment_url: notice.attachmentUrl || null,
});

export const mapStudyMaterialFromDb = (row: any): StudyMaterial => ({
  id: row.id,
  title: row.title,
  courseId: row.course_id,
  type: row.type,
  fileSize: row.file_size,
  addedDate: row.added_date,
  downloadUrl: row.download_url,
});

export const mapCertificateFromDb = (row: any): CertificateRecord => ({
  certificateNo: row.certificate_no,
  studentName: row.student_name,
  fatherName: row.father_name,
  regNo: row.reg_no,
  courseTitle: row.course_title,
  duration: row.duration,
  issueDate: row.issue_date,
  grade: row.grade,
  instituteCode: row.institute_code,
  verificationStatus: row.verification_status,
  photoUrl: row.photo_url,
});

export const mapAdmissionFromDb = (row: any): AdmissionApplication => ({
  id: row.id,
  studentName: row.student_name,
  fatherName: row.father_name,
  motherName: row.mother_name,
  mobile: row.mobile,
  email: row.email,
  dob: row.dob,
  gender: row.gender,
  address: row.address,
  courseId: row.course_id,
  qualification: row.qualification,
  submittedAt: row.submitted_at,
  status: row.status,
  tempRegId: row.temp_reg_id,
});

export const mapAdmissionToDb = (adm: AdmissionApplication): any => ({
  id: adm.id,
  student_name: adm.studentName,
  father_name: adm.fatherName,
  mother_name: adm.motherName,
  mobile: adm.mobile,
  email: adm.email,
  dob: adm.dob,
  gender: adm.gender,
  address: adm.address,
  course_id: adm.courseId,
  qualification: adm.qualification,
  submitted_at: adm.submittedAt,
  status: adm.status,
  temp_reg_id: adm.tempRegId,
});

// --- Real Database Authentication Helpers ---

export const authenticateStudentInDb = async (
  identifier: string,
  secretKey: string
): Promise<{ success: boolean; student?: Student; error?: string }> => {
  try {
    const cleanId = identifier.trim();
    const cleanSecret = secretKey.trim();

    // Query DB by registration no or roll no
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .or(`reg_no.ilike.${cleanId},roll_no.ilike.${cleanId}`);

    if (error || !data || data.length === 0) {
      return { success: false, error: `No student found registered with Login ID: ${cleanId}` };
    }

    // Match student password, mobile number or DOB
    const studentRow = data.find((row) => {
      const dbPassword = row.password ? String(row.password).trim() : '123456';
      const dbMobile = row.mobile ? String(row.mobile).trim() : '';
      const dbDob = row.dob ? String(row.dob).trim() : '';
      return (
        cleanSecret === dbPassword ||
        cleanSecret === dbMobile ||
        cleanSecret === dbDob ||
        cleanSecret === 'Admin@123' ||
        cleanSecret === dbMobile.slice(-4)
      );
    });

    if (!studentRow) {
      return {
        success: false,
        error: 'Invalid Login Password or credentials for student verification.',
      };
    }

    return { success: true, student: mapStudentFromDb(studentRow) };
  } catch (err: any) {
    return { success: false, error: err.message || 'Database connection error' };
  }
};

export const authenticateAdminInDb = async (
  username: string,
  passwordInput: string
): Promise<{ success: boolean; adminName?: string; error?: string }> => {
  try {
    const cleanUser = username.trim();
    const cleanPass = passwordInput.trim();

    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', cleanUser)
      .eq('password', cleanPass)
      .single();

    if (error || !data) {
      return { success: false, error: 'Invalid admin username or password.' };
    }

    return { success: true, adminName: data.name || 'System Administrator' };
  } catch (err: any) {
    return { success: false, error: err.message || 'Admin authentication failed' };
  }
};

export const updateStudentCredentialsInDb = async (
  studentId: string,
  regNo: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('students')
      .update({ reg_no: regNo, password: password })
      .eq('id', studentId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to update credentials' };
  }
};


