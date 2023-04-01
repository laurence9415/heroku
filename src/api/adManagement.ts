import { useMutation } from 'react-query';
import axios from 'axios';

import type { SetGetArgs } from 'types';

export const useSetBulkCprAndThreshold = ({ onSuccess, onError, onSettled }: SetGetArgs) => {
  return useMutation({
    mutationFn: async ({
      id_type,
      payload
    }: {
      id_type: string;
      payload: {
        id: string;
        target: number,
        threshold: number
      }[]
    }) => {
      const response = await axios.put('/api/bulk-update-cost-per-result', {
        id_type,
        cost_per_results: payload.map(({ id, target, threshold }) => ({
          id: id,
          cost_per_result_target: target,
          cost_per_result_threshold_percentage: threshold + 100
        }))
      });

      if (response.status !== 200) {
        // TODO: Add some sort of monitoring/error logging like Sentry
        throw new Error('Unable to bulk update CPR target and threshold');
      }

      return response.data;
    },
    onSuccess,
    onError,
    onSettled
  })
};

export const useSetCprAndThreshold = ({ onSuccess, onError, onSettled }: SetGetArgs) => {
  return useMutation({
    mutationFn: async ({
      adAccountId,
      campaignId,
      target,
      threshold
    }: {
      adAccountId: string;
      campaignId?: string;
      target: number,
      threshold: number
    }) => {
      let endpoint = `/api/ad-accounts/${adAccountId}`;

      if (campaignId) {
        endpoint += `/campaigns/${campaignId}`
      }

      const response = await axios.put(`${endpoint}/update-cost-per-result`, {
        cost_per_result_target: target,
        cost_per_result_threshold_percentage: threshold + 100
      });

      if (response.status !== 200) {
        // TODO: Add some sort of monitoring/error logging like Sentry
        throw new Error('Unable to update CPR target and threshold');
      }

      return response.data;
    },
    onSuccess,
    onError,
    onSettled
  })
};

export const useSetDailyBudget = ({ onSuccess, onError, onSettled }: SetGetArgs) => {
  return useMutation({
    mutationFn: async ({
      campaignId,
      adSetId,
      dailyBudget
    }: {
      campaignId?: string;
      adSetId?: string;
      dailyBudget: number;
    }) => {
      if (!campaignId && !adSetId) {
        throw new Error('campaignId or adSetId is required for setting daily budget')
      }

      let endpoint = '';

      if (campaignId) {
        endpoint = `/campaigns/${campaignId}`;
      }

      if (adSetId) {
        endpoint = `/adsets/${adSetId}`
      }

      const response = await axios.put(`/api${ endpoint }/set-daily-budget`, {
        daily_budget: dailyBudget
      });

      if (response.status !== 200) {
        // TODO: Add some sort of monitoring/error logging like Sentry
        throw new Error('Unable to update CPR target and threshold');
      }

      return response.data;
    },
    onSuccess,
    onError,
    onSettled
    })
};

export const useSetStatus = ({ onSuccess, onError, onSettled }: SetGetArgs) => {
  return useMutation({
    mutationFn: async ({
      campaignId,
      adSetId,
      adId,
      status
    }: {
      campaignId?: string;
      adSetId?: string;
      adId?: string;
      status: string;
    }) => {
      if (!campaignId && !adSetId && !adId) {
        throw new Error('campaignId, adSetId or adId is required for updating status')
      }

      let endpoint = '';

      if (campaignId) {
        endpoint = `/campaigns/${campaignId}`;
      }

      if (adSetId) {
        endpoint = `/adsets/${adSetId}`
      }

      if (adId) {
        endpoint = `/ads/${adId}`
      }

      const response = await axios.put(`/api${ endpoint }/update-status`, { status });

      if (response.status !== 200) {
        // TODO: Add some sort of monitoring/error logging like Sentry
        throw new Error('Unable to update CPR target and threshold');
      }

      return response.data;
    },
    onSuccess,
    onError,
    onSettled
  })
}