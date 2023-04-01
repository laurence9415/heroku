import { useQuery } from 'react-query';
import axios from 'axios';

import type { AdAccounts } from 'types';

const MOCK_ACCOUNTS: AdAccounts[] = [
  {
    name: 'Baoss Digital',
    id: 'act_125489374521',
  },
  {
    name: 'Bao Le',
    id: 'act_485793847598',
  },
  {
    name: 'Real Estate Lead Gen Campaigns',
    id: 'act_278349283743',
  },
  {
    name: 'Belvedere Engagement',
    id: 'act_394802385739',
  },
  {
    name: 'Baoss Digital - FAAB',
    id: 'act_493085948305',
  },
  {
    name: 'Baoss Digital',
    id: 'act_125489374321',
  },
  {
    name: 'Bao Le',
    id: 'act_485793547598',
  },
  {
    name: 'Real Estate Lead Gen Campaigns',
    id: 'act_278329283743',
  },
  {
    name: 'Belvedere Engagement',
    id: 'act_394802185739',
  },
  {
    name: 'Baoss Digital - FAAB',
    id: 'act_493085938305',
  },
];

export const useAdAccountsQuery = () => {
  return useQuery<{ data: AdAccounts[] }>({
    queryKey: 'ad-accounts',
    staleTime: 3600,
    queryFn: async () => {
      // return new Promise<AdAccounts[]>((resolve) => resolve(MOCK_ACCOUNTS));
      
      const response = await axios.get('/api/ad-accounts');

      if (response.status !== 200) {
        // TODO: Add some sort of monitoring/error logging like Sentry
        throw new Error('Unable to fetch ad accounts');
      }

      return response.data;
    }
  });
}

export const useAdAccountsInsightsQuery = ({
  search,
  start_date,
  end_date
}: {
  search?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}) => {
  return useQuery<any>({
    queryKey: ['ad-account-insights', search, start_date, end_date],
    staleTime: 3600,
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) {
        params.append('search', search);
      }

      if (start_date) {
        params.append('start_date', start_date);
      }

      if (end_date) {
        params.append('end_date', end_date);
      }

      const response = await axios.get(`/api/dashboard/ad-accounts?${ params.toString() }`);

      if (response.status !== 200) {
        // TODO: Add some sort of monitoring/error logging like Sentry
        throw new Error('Unable to fetch ad accounts');
      }

      return response.data;
    }
  })
}
