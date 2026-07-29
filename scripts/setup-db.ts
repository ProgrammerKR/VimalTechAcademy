import { Client } from 'pg';
import {
  MOCK_COURSES,
  MOCK_STUDENTS,
  MOCK_NOTICES,
  MOCK_STUDY_MATERIALS,
  MOCK_CERTIFICATES,
  MOCK_TESTIMONIALS,
  MOCK_FACULTY,
  MOCK_GALLERY,
} from '../src/data/mockData';

async function main() {
  console.log('Connecting to Supabase PostgreSQL database...');

  const client = new Client({
    host: 'db.alcguhhptvdlqxhwgkyc.supabase.co',
    port: 5432,
    user: 'postgres',
    password: 'Vimal.kr@123',
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  console.log('Successfully connected to database!');

  // Create tables
  console.log('Creating tables...');

  await client.query(`
    -- Courses table
    CREATE TABLE IF NOT EXISTS public.courses (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      title TEXT NOT NULL,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      category TEXT NOT NULL,
      duration TEXT NOT NULL,
      duration_months INT NOT NULL,
      hours_per_day TEXT NOT NULL,
      eligibility TEXT NOT NULL,
      total_fee INT NOT NULL,
      admission_fee INT NOT NULL,
      monthly_fee INT,
      discount_percentage INT,
      syllabus JSONB NOT NULL,
      features JSONB NOT NULL,
      career_opportunities JSONB NOT NULL,
      icon_name TEXT NOT NULL,
      is_popular BOOLEAN DEFAULT false,
      color_theme TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Students table
    CREATE TABLE IF NOT EXISTS public.students (
      id TEXT PRIMARY KEY,
      reg_no TEXT UNIQUE NOT NULL,
      roll_no TEXT NOT NULL,
      name TEXT NOT NULL,
      father_name TEXT NOT NULL,
      mother_name TEXT NOT NULL,
      dob TEXT NOT NULL,
      gender TEXT NOT NULL,
      mobile TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      course_id TEXT NOT NULL,
      course_title TEXT NOT NULL,
      batch_timing TEXT NOT NULL,
      qualification TEXT NOT NULL,
      admission_date TEXT NOT NULL,
      photo_url TEXT NOT NULL,
      status TEXT NOT NULL,
      attendance_percentage INT NOT NULL,
      fee_paid INT NOT NULL,
      total_fee INT NOT NULL,
      pending_fee INT NOT NULL,
      last_payment_date TEXT,
      certificate_issued BOOLEAN DEFAULT false,
      certificate_no TEXT,
      grade TEXT,
      password TEXT DEFAULT 'Admin@123',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Admissions table
    CREATE TABLE IF NOT EXISTS public.admissions (
      id TEXT PRIMARY KEY,
      student_name TEXT NOT NULL,
      father_name TEXT NOT NULL,
      mother_name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      email TEXT NOT NULL,
      dob TEXT NOT NULL,
      gender TEXT NOT NULL,
      address TEXT NOT NULL,
      course_id TEXT NOT NULL,
      qualification TEXT NOT NULL,
      submitted_at TEXT NOT NULL,
      status TEXT NOT NULL,
      temp_reg_id TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Notices table
    CREATE TABLE IF NOT EXISTS public.notices (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      content TEXT NOT NULL,
      important BOOLEAN DEFAULT false,
      attachment_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Study Materials table
    CREATE TABLE IF NOT EXISTS public.study_materials (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      course_id TEXT NOT NULL,
      type TEXT NOT NULL,
      file_size TEXT NOT NULL,
      added_date TEXT NOT NULL,
      download_url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Certificates table
    CREATE TABLE IF NOT EXISTS public.certificates (
      certificate_no TEXT PRIMARY KEY,
      student_name TEXT NOT NULL,
      father_name TEXT NOT NULL,
      reg_no TEXT NOT NULL,
      course_title TEXT NOT NULL,
      duration TEXT NOT NULL,
      issue_date TEXT NOT NULL,
      grade TEXT NOT NULL,
      institute_code TEXT NOT NULL,
      verification_status TEXT NOT NULL,
      photo_url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Testimonials table
    CREATE TABLE IF NOT EXISTS public.testimonials (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      course TEXT NOT NULL,
      designation TEXT NOT NULL,
      company TEXT NOT NULL,
      review TEXT NOT NULL,
      rating INT NOT NULL,
      photo_url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Faculty table
    CREATE TABLE IF NOT EXISTS public.faculty (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      designation TEXT NOT NULL,
      qualification TEXT NOT NULL,
      experience TEXT NOT NULL,
      specialization TEXT NOT NULL,
      photo_url TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Gallery table
    CREATE TABLE IF NOT EXISTS public.gallery (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Admins table for real authentication
    CREATE TABLE IF NOT EXISTS public.admins (
      username TEXT PRIMARY KEY,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `);

  console.log('Tables created successfully. Granting permissions & RLS policies...');

  await client.query(`
    -- Disable RLS or grant anonymous full access to tables for anon key compatibility
    ALTER TABLE public.students ADD COLUMN IF NOT EXISTS password TEXT DEFAULT 'Admin@123';
    ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.students DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.admissions DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.notices DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.study_materials DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.certificates DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.testimonials DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.faculty DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.gallery DISABLE ROW LEVEL SECURITY;
    ALTER TABLE public.admins DISABLE ROW LEVEL SECURITY;

    GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
  `);

  console.log('Seeding mock data into database...');

  // 0. Seed Admins
  await client.query(
    `INSERT INTO public.admins (username, password, name, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password;`,
    ['admin@vimaltechacademy.edu', 'Admin@123', 'System Administrator', 'admin']
  );
  await client.query(
    `INSERT INTO public.admins (username, password, name, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password;`,
    ['admin', 'Admin@123', 'System Administrator', 'admin']
  );
  await client.query(
    `INSERT INTO public.admins (username, password, name, role)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password;`,
    ['director', 'Admin@123', 'Director', 'admin']
  );
  console.log('Seeded real admin credentials.');

  // 1. Seed Courses
  for (const c of MOCK_COURSES) {
    await client.query(
      `INSERT INTO public.courses (
        id, code, title, short_description, full_description, category, duration, duration_months,
        hours_per_day, eligibility, total_fee, admission_fee, monthly_fee, discount_percentage,
        syllabus, features, career_opportunities, icon_name, is_popular, color_theme
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        short_description = EXCLUDED.short_description,
        full_description = EXCLUDED.full_description,
        total_fee = EXCLUDED.total_fee,
        admission_fee = EXCLUDED.admission_fee;`,
      [
        c.id,
        c.code,
        c.title,
        c.shortDescription,
        c.fullDescription,
        c.category,
        c.duration,
        c.durationMonths,
        c.hoursPerDay,
        c.eligibility,
        c.totalFee,
        c.admissionFee,
        c.monthlyFee || null,
        c.discountPercentage || null,
        JSON.stringify(c.syllabus),
        JSON.stringify(c.features),
        JSON.stringify(c.careerOpportunities),
        c.iconName,
        c.isPopular || false,
        c.colorTheme,
      ]
    );
  }
  console.log(`Seeded ${MOCK_COURSES.length} courses.`);

  // 2. Seed Students
  for (const s of MOCK_STUDENTS) {
    await client.query(
      `INSERT INTO public.students (
        id, reg_no, roll_no, name, father_name, mother_name, dob, gender, mobile, email, address,
        course_id, course_title, batch_timing, qualification, admission_date, photo_url, status,
        attendance_percentage, fee_paid, total_fee, pending_fee, last_payment_date, certificate_issued,
        certificate_no, grade
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)
      ON CONFLICT (id) DO UPDATE SET
        fee_paid = EXCLUDED.fee_paid,
        pending_fee = EXCLUDED.pending_fee,
        status = EXCLUDED.status;`,
      [
        s.id,
        s.regNo,
        s.rollNo,
        s.name,
        s.fatherName,
        s.motherName,
        s.dob,
        s.gender,
        s.mobile,
        s.email,
        s.address,
        s.courseId,
        s.courseTitle,
        s.batchTiming,
        s.qualification,
        s.admissionDate,
        s.photoUrl,
        s.status,
        s.attendancePercentage,
        s.feePaid,
        s.totalFee,
        s.pendingFee,
        s.lastPaymentDate || null,
        s.certificateIssued || false,
        s.certificateNo || null,
        s.grade || null,
      ]
    );
  }
  console.log(`Seeded ${MOCK_STUDENTS.length} students.`);

  // 3. Seed Notices
  for (const n of MOCK_NOTICES) {
    await client.query(
      `INSERT INTO public.notices (
        id, title, category, date, content, important, attachment_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        content = EXCLUDED.content;`,
      [n.id, n.title, n.category, n.date, n.content, n.important || false, n.attachmentUrl || null]
    );
  }
  console.log(`Seeded ${MOCK_NOTICES.length} notices.`);

  // 4. Seed Study Materials
  for (const m of MOCK_STUDY_MATERIALS) {
    await client.query(
      `INSERT INTO public.study_materials (
        id, title, course_id, type, file_size, added_date, download_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT (id) DO NOTHING;`,
      [m.id, m.title, m.courseId, m.type, m.fileSize, m.addedDate, m.downloadUrl]
    );
  }
  console.log(`Seeded ${MOCK_STUDY_MATERIALS.length} study materials.`);

  // 5. Seed Certificates
  for (const cert of MOCK_CERTIFICATES) {
    await client.query(
      `INSERT INTO public.certificates (
        certificate_no, student_name, father_name, reg_no, course_title, duration, issue_date,
        grade, institute_code, verification_status, photo_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      ON CONFLICT (certificate_no) DO NOTHING;`,
      [
        cert.certificateNo,
        cert.studentName,
        cert.fatherName,
        cert.regNo,
        cert.courseTitle,
        cert.duration,
        cert.issueDate,
        cert.grade,
        cert.instituteCode,
        cert.verificationStatus,
        cert.photoUrl,
      ]
    );
  }
  console.log(`Seeded ${MOCK_CERTIFICATES.length} certificates.`);

  // 6. Seed Testimonials
  for (const t of MOCK_TESTIMONIALS) {
    await client.query(
      `INSERT INTO public.testimonials (
        id, name, course, designation, company, review, rating, photo_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      ON CONFLICT (id) DO NOTHING;`,
      [t.id, t.name, t.course, t.designation, t.company, t.review, t.rating, t.photoUrl]
    );
  }
  console.log(`Seeded ${MOCK_TESTIMONIALS.length} testimonials.`);

  // 7. Seed Faculty
  for (const f of MOCK_FACULTY) {
    await client.query(
      `INSERT INTO public.faculty (
        id, name, designation, qualification, experience, specialization, photo_url
      ) VALUES ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT (id) DO NOTHING;`,
      [f.id, f.name, f.designation, f.qualification, f.experience, f.specialization, f.photoUrl]
    );
  }
  console.log(`Seeded ${MOCK_FACULTY.length} faculty members.`);

  // 8. Seed Gallery
  for (const g of MOCK_GALLERY) {
    await client.query(
      `INSERT INTO public.gallery (
        id, title, category, image_url, date
      ) VALUES ($1,$2,$3,$4,$5)
      ON CONFLICT (id) DO NOTHING;`,
      [g.id, g.title, g.category, g.imageUrl, g.date]
    );
  }
  console.log(`Seeded ${MOCK_GALLERY.length} gallery items.`);

  await client.end();
  console.log('Database initialization and seeding completed successfully!');
}

main().catch((err) => {
  console.error('Database setup failed:', err);
  process.exit(1);
});
