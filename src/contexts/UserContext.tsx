
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  studentId: string;
  school: string;
  kcseGrade: string;
  cluster: string;
  kuccpsStatus: string;
  helbStatus: string;
  competencyScore: number;
  applications: number;
  bids: number;
  interviews: number;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setUser = (userData: User) => {
    setUserState(userData);
    setIsAuthenticated(true);
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUserState(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Check for stored user on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserState(userData);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
