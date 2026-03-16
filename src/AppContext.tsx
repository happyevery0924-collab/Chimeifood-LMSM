import React, { createContext, useContext, useState, ReactNode } from 'react';
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
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [registrations, setRegistrations] = useState<Registration[]>(MOCK_REGISTRATIONS);

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
