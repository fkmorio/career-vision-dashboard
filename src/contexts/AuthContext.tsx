
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'student' | 'teacher' | 'parent' | 'administrator' | 'educator';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileData: {
    studentId?: string;
    school?: string;
    grade?: number;
    cluster?: string;
    parentChildId?: string;
    teacherSubjects?: string[];
    adminLevel?: 'school' | 'county' | 'national';
  };
  permissions: string[];
  sessionToken: string;
  lastLogin: Date;
  preferences: {
    language: 'en' | 'sw';
    notifications: boolean;
    aiRecommendations: boolean;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  updatePreferences: (preferences: Partial<AuthUser['preferences']>) => void;
  refreshToken: () => Promise<void>;
}

interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Role-based permissions mapping
const rolePermissions: Record<UserRole, string[]> = {
  student: [
    'view_own_data',
    'take_assessment',
    'view_pathways',
    'submit_preferences',
    'view_recommendations'
  ],
  teacher: [
    'view_class_data',
    'upload_scores',
    'view_predictions',
    'manage_assessments',
    'provide_feedback'
  ],
  parent: [
    'view_child_data',
    'view_progress',
    'provide_consent',
    'communicate_teachers'
  ],
  educator: [
    'view_learner_data',
    'provide_guidance',
    'manage_pathways',
    'view_analytics',
    'curriculum_support'
  ],
  administrator: [
    'view_all_data',
    'manage_assessments',
    'export_data',
    'system_configuration',
    'user_management',
    'view_reports'
  ]
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on mount
    const storedAuth = localStorage.getItem('auth_session');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData.sessionToken && new Date(authData.expiresAt) > new Date()) {
          setUser(authData.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('auth_session');
        }
      } catch (error) {
        console.error('Failed to restore auth session:', error);
        localStorage.removeItem('auth_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call - in real implementation, this would be a backend call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      const mockUser: AuthUser = {
        id: `user_${Date.now()}`,
        name: credentials.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: credentials.email,
        role: credentials.role,
        profileData: {
          ...(credentials.role === 'student' && {
            studentId: `STU${Date.now()}`,
            school: 'Demo Secondary School',
            grade: 9,
            cluster: 'STEM'
          }),
          ...(credentials.role === 'teacher' && {
            teacherSubjects: ['Mathematics', 'Physics'],
            school: 'Demo Secondary School'
          }),
          ...(credentials.role === 'parent' && {
            parentChildId: `STU${Date.now() - 1000}`
          }),
          ...(credentials.role === 'administrator' && {
            adminLevel: 'school' as const
          })
        },
        permissions: rolePermissions[credentials.role],
        sessionToken: `token_${Date.now()}_${Math.random()}`,
        lastLogin: new Date(),
        preferences: {
          language: 'en',
          notifications: true,
          aiRecommendations: true
        }
      };

      // Store session
      const sessionData = {
        user: mockUser,
        sessionToken: mockUser.sessionToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      };
      localStorage.setItem('auth_session', JSON.stringify(sessionData));

      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_session');
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const updatePreferences = (newPreferences: Partial<AuthUser['preferences']>) => {
    if (user) {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...newPreferences }
      };
      setUser(updatedUser);
      
      // Update stored session
      const storedAuth = localStorage.getItem('auth_session');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        authData.user = updatedUser;
        localStorage.setItem('auth_session', JSON.stringify(authData));
      }
    }
  };

  const refreshToken = async (): Promise<void> => {
    // In real implementation, this would refresh the session token
    console.log('Token refresh requested');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      hasPermission,
      hasRole,
      updatePreferences,
      refreshToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};
