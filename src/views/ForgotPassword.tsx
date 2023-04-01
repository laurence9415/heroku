import { ChangeEvent, useState } from 'react'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { SnackbarOrigin } from '@mui/material'
import { Email } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Errors } from '../types/Errors'
import { useNavigate } from 'react-router-dom'
import { useForgotPasswordMutataion } from 'api/auth'
import { ErrorBoundary } from 'components/ErrorBoundary';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({} as Errors)
  const { mutateAsync, isLoading, isSuccess } = useForgotPasswordMutataion({
    onSuccess: () => {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    },
    onError: (error: any) => setErrors(error.response.data.errors)
  })

  const navigate = useNavigate()
  const alertPosition: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'center'
  }

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handleOnClickSubmit = () => {
    mutateAsync(email)
  }

  const cancel = () => {
    navigate('/login')
  }

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Box height="100vh" className="bg-brand/10">
        <Box
          width='100%'
          height='100%'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          component='form'
        >
          <img alt="smart ass metrics logo" src="/assets/images/logo.png" className='h-[200px] w-[200px]' />
          <Paper elevation={5} sx={{ py: 7, width: '50%', mb: 2 }}>
            <Stack display="flex" spacing={3} height="100%" paddingX={7} textAlign="center">
              <Box
                textAlign='center'
                display='flex'
                justifyContent='center'
                flexDirection='column'
                alignItems='center'
              >
                <h1 className='text-3xl font-extrabold'>Reset Password</h1>
                <p>Enter your email address to reset your password.</p>
              </Box>

              <Stack flexGrow={1} spacing={3} textAlign="center">
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={email}
                  onChange={handleChangeEmail}
                  error={errors.hasOwnProperty('email')}
                  helperText={errors.email ? errors.email[0] : ''}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
                  }} />

                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  sx={{ paddingY: 2 }}
                  variant="contained"
                  onClick={handleOnClickSubmit}
                >
                  Submit
                </LoadingButton>

                <Link onClick={cancel} className="cursor-pointer">Cancel</Link>

              </Stack>
            </Stack>
          </Paper>
        </Box>

        <Snackbar open={isSuccess} autoHideDuration={3000} anchorOrigin={alertPosition}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Reset password has been sent to your email.
          </Alert>
        </Snackbar>
      </Box>
    </ErrorBoundary>
  )
}
