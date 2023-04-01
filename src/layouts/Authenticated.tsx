import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import { Navbar } from './Navbar';
import { CurrentUserProvider } from 'contexts/CurrentUser';
import { Onboarding } from 'views/Onboarding';
import { OnboardingProvider } from 'contexts/OnboardingContext';
import { ErrorBoundary } from 'components/ErrorBoundary';

export const AuthenticatedLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

   useEffect(() => {
    // TODO: Check if user has finished onboarding
  }, [])

  return (
    <CurrentUserProvider>
      <Box
        display="flex"
        height="100vh"
        marginLeft="65px" // Accounts for Navbar minimized width
      >
        <Navbar />
        <Box flex="1" className="bg-gray-100" p={2} maxWidth="100%">
          <ErrorBoundary fallback={<p>Something went wrong in authenticated layouts</p>}>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Box>
      <OnboardingProvider>
        <Onboarding
          open={ !!searchParams.get('onboarding') }
          onClose={ () => {
            searchParams.delete('onboarding');
            setSearchParams(searchParams);
          }}
        />
      </OnboardingProvider>
    </CurrentUserProvider>
  )
}
