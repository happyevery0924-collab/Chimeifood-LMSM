import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { User, Course, Registration, CourseCategory } from './types';
import { MOCK_USERS, MOCK_COURSES, MOCK_REGISTRATIONS } from './data';
import { io, Socket } from 'socket.io-client';

export type Tab = 'home' | 'records' | 'admin' | 'registration_list' | 'policy';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  homeFilter: CourseCategory | 'all';
  setHomeFilter: (filter: CourseCategory | 'all') => void;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  adminTab: 'create' | 'manage';
  setAdminTab: (tab: 'create' | 'manage') => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  registrations: Registration[];
  registerCourse: (courseId: string, data: { department: string; employeeId: string; name: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [homeFilter, setHomeFilter] = useState<CourseCategory | 'all'>('all');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [adminTab, setAdminTab] = useState<'create' | 'manage'>('create');
  const socketRef = useRef<Socket | null>(null);
  const isRemoteUpdateRef = useRef(false);
  
  const [courses, setCourses] = useState<Course[]>(() => {
    const savedCourses = localStorage.getItem('app_courses');
    if (savedCourses) {
      try {
        return JSON.parse(savedCourses);
      } catch (e) {
        console.error('Failed to parse courses from localStorage', e);
      }
    }
    return MOCK_COURSES;
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const savedRegistrations = localStorage.getItem('app_registrations');
    if (savedRegistrations) {
      try {
        return JSON.parse(savedRegistrations);
      } catch (e) {
        console.error('Failed to parse registrations from localStorage', e);
      }
    }
    return MOCK_REGISTRATIONS;
  });

  useEffect(() => {
    if (!selectedCourseId && courses.length > 0) {
      setSelectedCourseId(courses[0].id);
    }
  }, [courses, selectedCourseId]);

  useEffect(() => {
    const socket = io();
    socketRef.current = socket;

    socket.on('init_state', (state) => {
      isRemoteUpdateRef.current = true;
      if (state.courses) setCourses(state.courses);
      if (state.registrations) setRegistrations(state.registrations);
      if (state.currentUser) setCurrentUser(state.currentUser);
      if (state.activeTab) setActiveTab(state.activeTab);
      if (state.homeFilter) setHomeFilter(state.homeFilter);
      if (state.selectedCourseId) setSelectedCourseId(state.selectedCourseId);
      if (state.adminTab) setAdminTab(state.adminTab);
      setTimeout(() => { isRemoteUpdateRef.current = false; }, 0);
    });

    socket.on('state_updated', (state) => {
      isRemoteUpdateRef.current = true;
      if (state.courses) setCourses(state.courses);
      if (state.registrations) setRegistrations(state.registrations);
      if (state.currentUser) setCurrentUser(state.currentUser);
      if (state.activeTab) setActiveTab(state.activeTab);
      if (state.homeFilter) setHomeFilter(state.homeFilter);
      if (state.selectedCourseId) setSelectedCourseId(state.selectedCourseId);
      if (state.adminTab) setAdminTab(state.adminTab);
      setTimeout(() => { isRemoteUpdateRef.current = false; }, 0);
    });

    socket.on('request_initial_state', () => {
      socket.emit('update_state', { courses, registrations, currentUser, activeTab, homeFilter, selectedCourseId, adminTab });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('app_courses', JSON.stringify(courses));
    if (socketRef.current && !isRemoteUpdateRef.current) {
      socketRef.current.emit('update_state', { courses });
    }
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('app_registrations', JSON.stringify(registrations));
    if (socketRef.current && !isRemoteUpdateRef.current) {
      socketRef.current.emit('update_state', { registrations });
    }
  }, [registrations]);

  useEffect(() => {
    if (socketRef.current && !isRemoteUpdateRef.current) {
      socketRef.current.emit('update_state', { currentUser });
    }
  }, [currentUser]);

  useEffect(() => {
    if (socketRef.current && !isRemoteUpdateRef.current) {
      socketRef.current.emit('update_state', { activeTab });
    }
  }, [activeTab]);

  useEffect(() => {
    if (socketRef.current && !isRemoteUpdateRef.current) {
      socketRef.current.emit('update_state', { homeFilter });
    }
  }, [homeFilter]);

  useEffect(() => {
    if (socketRef.current && !isRemoteUpdateRef.current) {
      socketRef.current.emit('update_state', { selectedCourseId });
    }
  }, [selectedCourseId]);

  useEffect(() => {
    if (socketRef.current && !isRemoteUpdateRef.current) {
      socketRef.current.emit('update_state', { adminTab });
    }
  }, [adminTab]);

  const addCourse = (course: Course) => {
    setCourses(prev => [...prev, course]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const registerCourse = (courseId: string, data: { department: string; employeeId: string; name: string }) => {
    const newReg: Registration = {
      id: `R${Date.now()}`,
      department: data.department,
      employeeId: data.employeeId,
      name: data.name,
      courseId,
      status: 'registered',
      timestamp: new Date().toISOString(),
    };
    setRegistrations(prev => [...prev, newReg]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeTab,
        setActiveTab,
        homeFilter,
        setHomeFilter,
        selectedCourseId,
        setSelectedCourseId,
        adminTab,
        setAdminTab,
        courses,
        addCourse,
        deleteCourse,
        registrations,
        registerCourse,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
