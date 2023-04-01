import { ChangeEvent, useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { SnackbarOrigin } from '@mui/material';
import { Password } from '@mui/icons-material'

import { useResetPasswordMutation, useValidateTokenMutation } from 'api/auth'
import { ErrorBoundary } from 'components/ErrorBoundary';
import type { Errors, ResetPasswordForm } from 'types';



export const ResetPassword = () => {
  const [form, setForm] = useState({} as ResetPasswordForm)

  const { mutateAsync, isLoading, isSuccess } = useResetPasswordMutation({
    onSuccess: () => {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
      setForm({})
    },
    onError: (error: any) => setErrors(error.response.data.errors)
  })

  const { mutateAsync: validateTokenMutate } = useValidateTokenMutation({
    onSuccess: () => {
      setForm({
        ...form,
        token: searchParams.get('token') ?? ''
      })
    },
    onError: (error: any) => navigate('/login')
  })

  const [errors, setErrors] = useState({} as Errors)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const alertPosition: SnackbarOrigin = {
    vertical: 'top',
    horizontal: 'center'
  }

  const validateToken = (token: string): void => {
    validateTokenMutate(token)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = () => {
    mutateAsync(form)
  }

  const getError = (error: undefined | string[]): string => {
    if (!error || error.length === 0) return ''

    return error[0] || ''
  }

  useEffect(() => {
    const token = searchParams.get('token') ?? ''
    validateToken(token)
  }, [])

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
                <p>Enter your new password.</p>
              </Box>

              <Stack flexGrow={1} spacing={3} paddingX={7}>
                <TextField
                  type="password"
                  label="Password"
                  name="password"
                  variant="outlined"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.hasOwnProperty('password')}
                  helperText={getError(errors.password)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Password /></InputAdornment>,
                  }}
                />

                <TextField
                  type="password"
                  label="Confirm Password"
                  name="password_confirmation"
                  variant="outlined"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Password /></InputAdornment>,
                  }}
                />

                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  sx={{ paddingY: 2 }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </Stack>
          </Paper>

          <Snackbar open={isSuccess} autoHideDuration={3000} anchorOrigin={alertPosition}>
            <Alert severity="success" sx={{ width: '100%' }}>
              Password reset successfully.
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ErrorBoundary>
  )
}
