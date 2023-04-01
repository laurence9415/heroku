import { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ReactElement, Dispatch, SetStateAction } from 'react';

import type {
  AdAccounts,
  AccountLevelOverrides
} from 'types';


interface OnboardingContextProps {
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  selectedAccounts: AdAccounts[];
  setSelectedAccounts: Dispatch<SetStateAction<AdAccounts[]>>;
  globalCpr: string;
  setGlobalCpr: Dispatch<SetStateAction<string>>;
  globalThreshold: string;
  setGlobalThreshold: Dispatch<SetStateAction<string>>;
  accountLevelCprOverrides: AccountLevelOverrides;
  addAccountLevelCprOverride: (overrides: AccountLevelOverrides) => void;
  removeAccountLevelCprOverride: (id: string) => void;
}

const OnboardingContext = createContext<OnboardingContextProps>({
  currentStep: 0,
  setCurrentStep: () => {},
  selectedAccounts: [],
  setSelectedAccounts: () => {},
  globalCpr: '0',
  setGlobalCpr: () => {},
  globalThreshold: '0',
  setGlobalThreshold: () => {},
  accountLevelCprOverrides: {},
  addAccountLevelCprOverride: () => {},
  removeAccountLevelCprOverride: () => {},
});

interface ContextProviderProps {
  children: ReactElement | ReactElement[];
}

export const OnboardingProvider = ({ children }: ContextProviderProps) => {
  const [searchParams] = useSearchParams();
  const [selectedAccounts, setSelectedAccounts] = useState<AdAccounts[]>([]);
  const [globalCpr, setGlobalCpr] = useState('0');
  const [globalThreshold, setGlobalThreshold] = useState('0');
  const [currentStep, setCurrentStep] = useState(
    parseInt(searchParams.get('onboarding_step') ?? '0')
  );
  const [accountLevelCprOverrides, setAccountLevelCprOverride] = useState<AccountLevelOverrides>({});

  useEffect(() => {
    if (searchParams.has('onboarding_step')) {
      setCurrentStep(parseInt(searchParams.get('onboarding_step') as string))
    }
  }, [searchParams])

  const addAccountLevelCprOverride = (overrides: AccountLevelOverrides) => {
    setAccountLevelCprOverride(overrides)
  };

  const removeAccountLevelCprOverride = (id: string) => {
    setAccountLevelCprOverride(prev => {
      const _prev = { ...prev };
      delete _prev[id];

      return _prev
    })
  };

  return (
    <OnboardingContext.Provider value={{
      currentStep,
      setCurrentStep,
      selectedAccounts,
      setSelectedAccounts,
      globalCpr,
      setGlobalCpr,
      globalThreshold,
      setGlobalThreshold,
      accountLevelCprOverrides,
      addAccountLevelCprOverride,
      removeAccountLevelCprOverride,
    }}>
      { children }
    </OnboardingContext.Provider>
  );
}

export const useOnboardingContext = () => useContext(OnboardingContext);