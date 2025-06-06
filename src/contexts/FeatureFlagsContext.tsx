
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetAudience?: 'all' | 'students' | 'educators' | 'parents';
  startDate?: string;
  endDate?: string;
  variant?: 'A' | 'B';
  metadata?: Record<string, any>;
}

interface FeatureFlagsContextType {
  flags: Record<string, FeatureFlag>;
  isFeatureEnabled: (flagId: string) => boolean;
  getFeatureVariant: (flagId: string) => 'A' | 'B' | null;
  updateFlag: (flagId: string, updates: Partial<FeatureFlag>) => void;
  addFlag: (flag: FeatureFlag) => void;
  removeFlag: (flagId: string) => void;
  getUserVariant: (flagId: string) => 'A' | 'B';
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
  }
  return context;
};

const defaultFlags: Record<string, FeatureFlag> = {
  'new-dashboard-layout': {
    id: 'new-dashboard-layout',
    name: 'New Dashboard Layout',
    description: 'Test new dashboard layout with improved navigation',
    enabled: false,
    rolloutPercentage: 50,
    targetAudience: 'students',
    variant: 'A'
  },
  'enhanced-ai-recommendations': {
    id: 'enhanced-ai-recommendations',
    name: 'Enhanced AI Recommendations',
    description: 'Improved AI recommendation algorithm',
    enabled: true,
    rolloutPercentage: 25,
    targetAudience: 'all',
    variant: 'B'
  },
  'gamification-system': {
    id: 'gamification-system',
    name: 'Gamification System',
    description: 'Add points, badges, and achievements to the platform',
    enabled: false,
    rolloutPercentage: 10,
    targetAudience: 'students'
  },
  'advanced-analytics': {
    id: 'advanced-analytics',
    name: 'Advanced Analytics Dashboard',
    description: 'Enhanced analytics with Power BI integration',
    enabled: false,
    rolloutPercentage: 100,
    targetAudience: 'educators'
  }
};

interface FeatureFlagsProviderProps {
  children: ReactNode;
}

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({ children }) => {
  const [flags, setFlags] = useState<Record<string, FeatureFlag>>(defaultFlags);

  // Load flags from localStorage on mount
  useEffect(() => {
    const storedFlags = localStorage.getItem('featureFlags');
    if (storedFlags) {
      try {
        const parsedFlags = JSON.parse(storedFlags);
        setFlags({ ...defaultFlags, ...parsedFlags });
      } catch (error) {
        console.error('Error loading feature flags:', error);
      }
    }
  }, []);

  // Save flags to localStorage when they change
  useEffect(() => {
    localStorage.setItem('featureFlags', JSON.stringify(flags));
  }, [flags]);

  const getUserHash = (userId: string = 'anonymous'): number => {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const isFeatureEnabled = (flagId: string): boolean => {
    const flag = flags[flagId];
    if (!flag || !flag.enabled) return false;

    // Check date range
    const now = new Date();
    if (flag.startDate && new Date(flag.startDate) > now) return false;
    if (flag.endDate && new Date(flag.endDate) < now) return false;

    // Check rollout percentage
    const userId = localStorage.getItem('userId') || 'anonymous';
    const userHash = getUserHash(userId + flagId);
    const userPercentile = userHash % 100;
    
    return userPercentile < flag.rolloutPercentage;
  };

  const getFeatureVariant = (flagId: string): 'A' | 'B' | null => {
    if (!isFeatureEnabled(flagId)) return null;
    return getUserVariant(flagId);
  };

  const getUserVariant = (flagId: string): 'A' | 'B' => {
    const userId = localStorage.getItem('userId') || 'anonymous';
    const userHash = getUserHash(userId + flagId + 'variant');
    return userHash % 2 === 0 ? 'A' : 'B';
  };

  const updateFlag = (flagId: string, updates: Partial<FeatureFlag>) => {
    setFlags(prev => ({
      ...prev,
      [flagId]: { ...prev[flagId], ...updates }
    }));
  };

  const addFlag = (flag: FeatureFlag) => {
    setFlags(prev => ({
      ...prev,
      [flag.id]: flag
    }));
  };

  const removeFlag = (flagId: string) => {
    setFlags(prev => {
      const newFlags = { ...prev };
      delete newFlags[flagId];
      return newFlags;
    });
  };

  return (
    <FeatureFlagsContext.Provider value={{
      flags,
      isFeatureEnabled,
      getFeatureVariant,
      updateFlag,
      addFlag,
      removeFlag,
      getUserVariant
    }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};
