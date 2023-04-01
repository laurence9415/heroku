import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useCurrentUser } from 'contexts/CurrentUser';

export const UserInfo = () => {
  const { currentUser } = useCurrentUser();

  return (
    <Paper elevation={ 3 }>
      <Box display="flex" flexDirection="column" gap={ 1 } p={ 3 }>
        <Typography variant="h6">User Info</Typography>

        <Box
          display="grid"
          gridAutoFlow="column"
          gridTemplateColumns="100px 2fr"
        >
          <Typography fontWeight={ 600 }>Name: </Typography>
          <Typography>{ currentUser?.name }</Typography>
        </Box>

        <Box
          display="grid"
          gridAutoFlow="column"
          gridTemplateColumns="100px 2fr"
        >
          <Typography fontWeight={ 600 }>Email: </Typography>
          <Typography>{ currentUser?.email }</Typography>
        </Box>
      </Box>
    </Paper>);
}