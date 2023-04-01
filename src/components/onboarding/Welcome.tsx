import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Set expectations during the onboarding process and establish glossary
 */

export const Welcome = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img alt="smart ass metrics logo" src="/assets/images/logo.png" className='h-[150px] w-[150px]' />
      <Typography variant="h4">Welcome to Smart Ass Metrics!</Typography>
    </Box>
  )
}
