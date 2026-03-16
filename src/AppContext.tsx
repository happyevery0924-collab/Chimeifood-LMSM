import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Course, Registration } from './types';
import { MOCK_USERS, MOCK_COURSES, MOCK_REGISTRATIONS } from './data';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  registrations: Registration[];
  registerCourse: (courseId: string, data: { department: string; employeeId: string; name: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  
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
    localStorage.setItem('app_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('app_registrations', JSON.stringify(registrations));
  }, [registrations]);

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
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
    setRegistrations([...registrations, newReg]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
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
