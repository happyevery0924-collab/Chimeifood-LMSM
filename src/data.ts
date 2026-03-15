import { Course, User, Registration } from './types';

export const MOCK_USERS: User[] = [
  { id: 'GUEST', name: '一般使用者', role: 'employee' },
  { id: 'A001', name: '系統管理員', role: 'admin' },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'C001',
    title: '食品安全衛生管理實務',
    category: 'external_physical',
    date: '2026-03-20',
    endDate: '2026-03-21',
    time: '14:00',
    location: '台北市信義區松仁路 100 號',
    description: '外部專業講師授課，探討最新食品安全法規與實務應用。',
  },
  {
    id: 'C002',
    title: '2026 數位行銷趨勢',
    category: 'external_online',
    link: 'https://example.com/course/c002',
    description: '線上研討會，了解最新數位行銷與社群經營策略。',
  },
  {
    id: 'C003',
    title: '奇美企業文化與核心價值',
    category: 'internal_digital',
    link: 'https://internal.chimei.com/learning/c003',
    description: '新進員工必修，認識奇美食品的歷史與企業精神。',
  },
  {
    id: 'C004',
    title: '產線工安與急救演練',
    category: 'internal_physical',
    date: new Date().toISOString().split('T')[0], // Today
    time: '09:00',
    location: '總部 1F 廠區',
    description: '廠區實地演練，包含消防設備操作與基本急救處置。',
  },
];

export const MOCK_REGISTRATIONS: Registration[] = [
  {
    id: 'R001',
    department: '行銷部',
    employeeId: 'E001',
    name: '王小明',
    courseId: 'C004',
    status: 'registered',
    timestamp: new Date().toISOString(),
  },
];
