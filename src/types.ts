export type Role = 'employee' | 'admin';

export type CourseCategory =
  | 'external_physical'
  | 'external_online'
  | 'internal_digital'
  | 'internal_physical';

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  date?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  time?: string;
  location?: string;
  link?: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface Registration {
  id: string;
  department: string;
  employeeId: string;
  name: string;
  courseId: string;
  status: 'registered';
  timestamp: string;
}
