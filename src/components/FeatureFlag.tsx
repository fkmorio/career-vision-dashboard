
import React from 'react';
import { useFeatureFlags } from '../contexts/FeatureFlagsContext';

interface FeatureFlagProps {
  flag: string;
  variant?: 'A' | 'B';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const FeatureFlag: React.FC<FeatureFlagProps> = ({ 
  flag, 
  variant, 
  fallback = null, 
  children 
}) => {
  const { isFeatureEnabled, getFeatureVariant } = useFeatureFlags();

  const isEnabled = isFeatureEnabled(flag);
  
  if (!isEnabled) {
    return <>{fallback}</>;
  }

  // If variant is specified, check if user gets that variant
  if (variant) {
    const userVariant = getFeatureVariant(flag);
    if (userVariant !== variant) {
      return <>{fallback}</>;
    }
  }

  return <>{children}</>;
};

export default FeatureFlag;
