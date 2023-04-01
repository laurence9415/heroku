import { useQuery } from 'react-query';
import axios from 'axios';

type GetSetProps = {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
}

interface ColumnPreset {
  id: string | number;
  label: string;
};

export const useGetColumnPresets = ({ onSuccess, onError, onSettled }: GetSetProps) => {
  return useQuery<ColumnPreset[]>({
    queryFn: async () => {
      return [
        {
          id: 1,
          label: 'The Luke Special'
        },
        {
          id: 2,
          label: 'Default'
        }
      ];
      
      // const response = await axios.get('/api/column-presets');

      // if (response.status !== 200) {
      //   // TODO: Add some sort of monitoring/error logging like Sentry
      //   throw new Error('Unable to update CPR target and threshold');
      // }

      // return response.data;
    },
    onSuccess,
    onError,
    onSettled
  })
};
