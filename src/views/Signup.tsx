import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { SnackbarOrigin } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import { Email, Password, Person } from '@mui/icons-material'

import { useSignUpMutation } from 'api/auth'
import { ErrorBoundary } from 'components/ErrorBoundary';
import type { Errors } from 'types';

export const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const { mutateAsync, isLoading, isSuccess } = useSignUpMutation({
    onSuccess: () => {
      setErrors({})
      setInput({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      })
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    },
    onError: (error: any) => setErrors(error.response.data.errors)
  })

  const [errors, setErrors] = useState({} as Errors)
  const alertPosition: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'center'
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }

  const cancel = () => {
    navigate('/login')
  }

  const handleSubmit = (): void => {
    mutateAsync(input)
  }

  return (
    <ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <Box height="100vh" className="bg-brand/10">
        <Box
          width='100%'
          height='100%'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          component="form"
        >
          <img alt="smart ass metrics logo" src="/assets/images/logo.png" className='h-[200px] w-[200px]' />
          <Paper elevation={5} sx={{ py: 7, width: '50%', mb: 2 }}>
            <Stack display="flex" spacing={3} height="100%" paddingX={7} textAlign="center">
              <Box>
                <h1 className='text-3xl font-extrabold'>Create An Account</h1>
                <p>Already signed up? <Link onClick={cancel} className="cursor-pointer">Login</Link></p>
              </Box>
              <TextField
                error={errors.hasOwnProperty('name')}
                helperText={errors.name ? errors.name[0] : ''}
                label="Name"
                name="name"
                variant="outlined"
                value={input.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
                }}
              />

              <TextField
                error={errors.hasOwnProperty('email')}
                helperText={errors.email ? errors.email[0] : ''}
                type="email"
                label="Email"
                name="email"
                variant="outlined"
                value={input.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
                }} />

              <TextField
                error={errors.hasOwnProperty('password')}
                helperText={errors.password ? errors.password[0] : ''}
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                value={input.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Password /></InputAdornment>,
                }} />

              <TextField
                error={errors.hasOwnProperty('password')}
                helperText={errors.password ? errors.password[0] : ''}
                type="password"
                label="Confirm Password"
                name="password_confirmation"
                variant="outlined"
                value={input.password_confirmation}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Password /></InputAdornment>,
                }} />

              <LoadingButton
                type="submit"
                loading={isLoading}
                variant="contained"
                sx={{ paddingY: 2 }}
                onClick={handleSubmit}
              >
                Submit
              </LoadingButton>
              <p>Or continue with <Link onClick={cancel} className="cursor-pointer">Facebook</Link></p>
            </Stack>
          </Paper>
          <Snackbar open={isSuccess} autoHideDuration={6000} anchorOrigin={alertPosition}>
            <Alert severity="success" sx={{ width: '100%' }}>
              Registered successfully. Redirect to login in 3seconds.
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ErrorBoundary>
  )
}
