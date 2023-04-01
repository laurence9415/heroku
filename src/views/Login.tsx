import { useState } from "react";
import TextField from '@mui/material/TextField'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Email, Password } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { useSignIn } from "react-auth-kit";

import { ErrorBoundary } from 'components/ErrorBoundary';
import { useLoginMutation } from 'api/auth';
import { FacebookLogin } from '../components/FacebookLogin'
import type { Errors } from 'types';

export const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({} as Errors);

  const { mutate: login, isLoading } = useLoginMutation({
    onSuccess: (data: any): any => {
      signIn({
        token: data.data.token,
        expiresIn: 60,
        tokenType: 'Bearer',
        authState: { email: data.data.email }
      })

      navigate('/dashboard');
    },
    onError: (error: any): any => {
      setErrors(error.response.data.errors)
    }
  })

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
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
          <Box className="lg:w-1/2  sm:w-full"
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <img alt="smart ass metrics logo" src="/assets/images/logo.png" className='h-[200px] w-[200px]' />
            <Paper elevation={5} sx={{ py: 7, width: '50%', mb: 2 }}>
              <Stack display="flex" spacing={3} height="100%" >
                <Box sx={{
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <h1 className='text-3xl font-extrabold'>Welcome Back</h1>
                  <p>Enter your credentials to access your account.</p>
                </Box>

                <Stack flexGrow={1} spacing={3} paddingX={7}>
                  <TextField
                    id="email"
                    label="Emaill"
                    variant="outlined"
                    type="email"
                    value={email}
                    onInput={handleInputEmail}
                    error={errors.hasOwnProperty('email')}
                    helperText={errors.email ? errors.email[0] : ''}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
                    }}
                  />

                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onInput={handleInputPassword}
                    error={errors.hasOwnProperty('password')}
                    helperText={errors.password ? errors.password[0] : ''}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><Password /></InputAdornment>,
                    }}
                  />

                  <Box display="flex" justifyContent="flex-end">
                    <Link onClick={() => navigate('/forgotpassword')} className="cursor-pointer">
                      Forgot password?
                    </Link>
                  </Box>

                  <LoadingButton
                    type="submit"
                    className="my-4"
                    variant="contained"
                    onClick={() => login({ email, password })}
                    sx={{ paddingY: 2 }}
                    loading={isLoading}
                  >
                    Sign In
                  </LoadingButton>

                  <Box sx={{ textAlign: 'center' }}>
                    <p>Or login using</p>
                    <FacebookLogin iconOnly redirect="/dashboard" />
                  </Box>
                </Stack>


              </Stack>
            </Paper>
            <Box display="flex" gap={1}>
              <p>or </p>
              <Link
                onClick={() => navigate('/signup')}
                className="cursor-pointer text-right"
              >
                Signup
              </Link>
            </Box>
          </Box>

        </Box>
      </Box>
    </ErrorBoundary>
  );
}
