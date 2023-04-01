import { useEffect } from 'react';
import type { ReactElement } from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';

interface AuthFormProps {
  children: ReactElement | ReactElement[];
}

export const AuthFormLayout = ({ children }: AuthFormProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const isAuth = isAuthenticated();
  
  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [isAuth, navigate])

  return (
    <Box height="100vh" className="bg-brand/10">
      { children }
    </Box>
  )
}