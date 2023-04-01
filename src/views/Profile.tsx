import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ChangePassword } from 'components/profile/ChangePassword';

import { UserInfo } from 'components/profile/UserInfo';

export const Profile = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      gap={ 2 }
    >
      <Typography variant="h5" mb={ 1 }>Profile</Typography>
      <UserInfo />
      <ChangePassword />
    </Box>
  )
}
