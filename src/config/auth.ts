
// Authentication Configuration
// This file prepares the structure for future Firebase/OAuth integration
// as outlined in the technology stack requirements

interface AuthConfig {
  provider: 'firebase' | 'oauth' | 'local';
  enabledMethods: string[];
  roles: string[];
  features: {
    customClaims: boolean;
    phoneAuth: boolean;
    socialLogin: boolean;
    multiLanguage: boolean;
  };
}

export const authConfig: AuthConfig = {
  provider: 'local', // Will be changed to 'firebase' when integrated
  enabledMethods: [
    'email/password',
    'google',
    'phone' // Future enhancement
  ],
  roles: [
    'student',
    'institution_admin',
    'policy_maker',
    'counselor'
  ],
  features: {
    customClaims: true,
    phoneAuth: false, // Enable when Firebase is integrated
    socialLogin: false, // Enable when Firebase is integrated
    multiLanguage: true, // Swahili + English support
  }
};

// Future Firebase configuration structure
export const firebaseConfig = {
  // These will be populated when Firebase is integrated
  apiKey: process.env.VITE_FIREBASE_API_KEY || '',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.VITE_FIREBASE_APP_ID || ''
};

// Role-based access control structure
export const rolePermissions = {
  student: ['dashboard', 'institutions', 'pathways', 'bidding', 'tracking', 'ai-assessment'],
  institution_admin: ['institution_dashboard', 'student_management', 'analytics'],
  policy_maker: ['policy_dashboard', 'system_analytics', 'reports'],
  counselor: ['counselor_dashboard', 'student_guidance', 'placement_insights']
};

// Multi-language support configuration
export const languageConfig = {
  default: 'en',
  supported: ['en', 'sw'], // English and Swahili
  fallback: 'en'
};
