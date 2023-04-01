import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import { LicenseInfo } from '@mui/x-license-pro';
import axios from 'axios'
import { CookiesProvider } from 'react-cookie';
import { AuthProvider, RequireAuth } from 'react-auth-kit';

import { CustomThemeProvider } from 'contexts/CustomTheme';
import { AuthenticatedLayout } from 'layouts/Authenticated';
import { AuthFormLayout } from 'layouts/AuthForm';
import { Dashboard } from 'views/Dashboard';
import { Settings } from 'views/Settings';
import { Profile } from 'views/Profile';
import { Signup } from 'views/Signup';
import { Login } from 'views/Login';
import { ForgotPassword } from 'views/ForgotPassword';
import { ResetPassword } from 'views/ResetPassword';

LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_PRO_KEY as string);

export const App = () => {
  axios.interceptors.request.use(
    config => {
      // TODO: Grab token from cookies instead.
      const token = document.cookie.split('; ')
        .find(row => row.startsWith('_auth='))?.split('=')[1] ?? ''

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }

      return config
    }
  )

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={ queryClient }>
      <AuthProvider
        authType='cookie'
        authName='_auth'
        cookieDomain={ window.location.hostname }
        cookieSecure={ process.env.NODE_ENV === 'production' }
      >
        <CookiesProvider>
          <CustomThemeProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <RequireAuth loginPath='/login'>
                      <AuthenticatedLayout />
                    </RequireAuth>
                  }
                >
                  <Route path="/dashboard" element={ <Dashboard />} />
                  <Route path="/settings" element={ <Settings />} />
                  <Route path="/profile" element={ <Profile />} />
                </Route>
                <Route
                  path="/signup"
                  element={ <AuthFormLayout><Signup /></AuthFormLayout> }
                />
                <Route
                  path="/login"
                  element={ <AuthFormLayout><Login /></AuthFormLayout> }
                />
                <Route
                  path="/forgotpassword"
                  element={ <AuthFormLayout><ForgotPassword /></AuthFormLayout> }
                />
                <Route
                  path="/reset-password"
                  element={ <AuthFormLayout><ResetPassword /></AuthFormLayout> }
                />
              </Routes>
            </BrowserRouter>
          </CustomThemeProvider>
        </CookiesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}