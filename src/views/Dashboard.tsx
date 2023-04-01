import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardHeader } from 'components/dashboard/DashboardHeader';
import { DashboardTable } from 'components/dashboard/DashboardTable';

export const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%">
      <Typography variant="h5" mb={ 1 }>Dashboard</Typography>
      <DashboardHeader />
      <DashboardTable />
    </Box>
  )
}
