import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const OnboardingComplete = () => {
  return (
    <Stack display="flex" flexDirection="column" alignItems="center" gap={ 2 }>
      <Typography variant="h4">You're all set!</Typography>
      <Typography variant="body1">Enjoy a donkey gif while we work on getting the data for your accounts!</Typography>
      <img
        alt="donkey gif"
        src="/assets/images/donkey-in-progress.gif"
        className='h-[225px] w-[300px]'
      />
      <Typography variant="body1">Click {" "}
        <Typography color="primary" component="span" fontWeight="bold">Finish</Typography>
        {" "} to go to your dashboard
      </Typography>
    </Stack>
  )
}
