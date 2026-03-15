import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Course, Registration } from './types';
import { MOCK_USERS, MOCK_COURSES, MOCK_REGISTRATIONS } from './data';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  registrations: Registration[];
  registerCourse: (courseId: string, data: { department: string; employeeId: string; name: string }) => void;
  signInCourse: (courseId: string, employeeId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [registrations, setRegistrations] = useState<Registration[]>(MOCK_REGISTRATIONS);

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
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

  const signInCourse = (courseId: string, employeeId: string) => {
    setRegistrations(prev =>
      prev.map(reg =>
        reg.courseId === courseId && reg.employeeId === employeeId
          ? { ...reg, status: 'signed_in', timestamp: new Date().toISOString() }
          : reg
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        courses,
        addCourse,
        registrations,
        registerCourse,
        signInCourse,
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
