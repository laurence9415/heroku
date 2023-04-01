import { useQuery } from 'react-query';
import axios from 'axios';

const MOCK_USER_PREFERENCES = {
  columnVisibility: {
    name: false,
    objective: true,
    cost_per_result_target: true,
    cpr_risk: true,
    daily_budget: true,
    spend: true,
    amount: true,
    result: true,
    status: true,
    cpc: true,
    cpm: true,
    cpr: true,
    impressions: true,
    frequency: true,
    reach: true,
    ulc: true,
    cpulc: true,
    clicks: true,
    link_clicks: true,
    cost_per_inline_link_click: true,
    ccvr: true,
    cvr: true,
    ctr: true,
    kpi_status: true,
    currency: true,
  }
}

export const useGetCurrentUser = () => {
  return useQuery<{ data: any}>({
    queryKey: 'me',
    staleTime: 360000,
    queryFn: async () => {
      const response = await axios.get('/api/me');
      
      if (response.status !== 200) {
        // TODO: Add some sort of monitoring/error logging like Sentry
        throw new Error('Unable to fetch current user');
      }

      response.data.data.preferences = MOCK_USER_PREFERENCES

      return response.data;
    },
  })
}