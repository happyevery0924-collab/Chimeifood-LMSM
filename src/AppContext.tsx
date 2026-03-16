import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Course, Registration } from './types';
import { db, auth } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

interface AppContextType {
  currentUser: User | null;
  isAuthReady: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  courses: Course[];
  addCourse: (course: Course) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  registrations: Registration[];
  registerCourse: (courseId: string, data: { department: string; employeeId: string; name: string }) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          let userData: User;
          if (userDoc.exists()) {
            userData = userDoc.data() as User;
          } else {
            // Create new user profile
            const isAdmin = firebaseUser.email === 'happyevery0924@gmail.com';
            userData = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email || '',
              role: isAdmin ? 'admin' : 'employee'
            };
            await setDoc(userDocRef, userData);
          }
          setCurrentUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady || !currentUser) return;

    const unsubscribeCourses = onSnapshot(
      collection(db, 'courses'),
      (snapshot) => {
        const coursesData: Course[] = [];
        snapshot.forEach((doc) => {
          coursesData.push({ id: doc.id, ...doc.data() } as Course);
        });
        setCourses(coursesData);
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'courses')
    );

    const unsubscribeRegistrations = onSnapshot(
      collection(db, 'registrations'),
      (snapshot) => {
        const regsData: Registration[] = [];
        snapshot.forEach((doc) => {
          regsData.push({ id: doc.id, ...doc.data() } as Registration);
        });
        setRegistrations(regsData);
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'registrations')
    );

    return () => {
      unsubscribeCourses();
      unsubscribeRegistrations();
    };
  }, [isAuthReady, currentUser]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const addCourse = async (course: Course) => {
    if (!currentUser) return;
    try {
      const courseRef = doc(db, 'courses', course.id);
      await setDoc(courseRef, course);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `courses/${course.id}`);
    }
  };

  const deleteCourse = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await deleteDoc(doc(db, 'courses', courseId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `courses/${courseId}`);
    }
  };

  const registerCourse = async (courseId: string, data: { department: string; employeeId: string; name: string }) => {
    if (!currentUser) return;
    const newRegId = `R${Date.now()}`;
    const newReg: Registration = {
      id: newRegId,
      department: data.department,
      employeeId: data.employeeId,
      name: data.name,
      courseId,
      status: 'registered',
      timestamp: new Date().toISOString(),
      userId: currentUser.id, // Add userId to match rules
    };
    
    try {
      await setDoc(doc(db, 'registrations', newRegId), newReg);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `registrations/${newRegId}`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthReady,
        login,
        logout,
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
