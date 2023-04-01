import { useMutation } from 'react-query';
import axios from 'axios';

import { SetGetArgs } from 'types';

export const useSetOnboarding = ({ onSuccess, onError, onSettled, onMutate }: SetGetArgs) => {
  return useMutation({
    mutationFn: async ({
      currentStep,
      isComplete,
      onSuccess
    }: {
      currentStep: number;
      isComplete: Boolean;
      onSuccess?: () => void;
    }) => {
      const response = await axios.post('/api/user/onboarding', {
        is_complete: isComplete,
        current_step: currentStep
      });

      if (response.status !== 200) {
        // TODO: Add some sort of monitoring/error logging like Sentry
        throw new Error('Unable to update current onboarding status');
      }

      onSuccess?.();

      return response.data;
    },
    onSuccess,
    onError,
    onSettled,
    onMutate
  })
}