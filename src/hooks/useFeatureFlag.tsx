
import { useFeatureFlags } from '../contexts/FeatureFlagsContext';

export const useFeatureFlag = (flagId: string) => {
  const { isFeatureEnabled, getFeatureVariant } = useFeatureFlags();
  
  const isEnabled = isFeatureEnabled(flagId);
  const variant = getFeatureVariant(flagId);
  
  return {
    isEnabled,
    variant,
    isVariantA: variant === 'A',
    isVariantB: variant === 'B'
  };
};
