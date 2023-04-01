import { createContext, useContext, useState } from 'react';
import type { ReactElement } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCookies } from 'react-cookie';

interface ContextProviderProps {
  children: ReactElement | ReactElement[];
}

interface CustomThemeContextProps {
  darkMode: boolean;
  handleDarkModeToggle: () => void;
}

const CustomThemeContext = createContext<CustomThemeContextProps>({
  darkMode: false,
  handleDarkModeToggle: () => {}
});

const DARK_MODE_COOKIE_NAME = '_darkMode';

export const CustomThemeProvider = ({ children }: ContextProviderProps) => {
  const [cookies, setCookie, removeCookie] = useCookies([DARK_MODE_COOKIE_NAME]);
  const [darkMode, setDarkMode] = useState(!!cookies._darkMode);

  const theme = createTheme({
    palette: {
      ...(darkMode && { mode: 'dark' }),
      primary: {
        main: '#4B0082',
      },
    },
    typography: {
      h1: {
        fontFamily: '"Montserrat", sans-serif',
      },
      h2: {
        fontFamily: '"Montserrat", sans-serif',
      },
      h3: {
        fontFamily: '"Montserrat", sans-serif',
      },
      h4: {
        fontFamily: '"Montserrat", sans-serif',
      },
      h5: {
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 600
      },
      h6: {
        fontFamily: '"Montserrat", sans-serif',
      },
    }
  });

  const handleDarkModeToggle = () => {
    if (darkMode) {
      removeCookie(DARK_MODE_COOKIE_NAME);
    } else {
      setCookie(DARK_MODE_COOKIE_NAME, true);
    }

    setDarkMode(!darkMode);
  }

  return (
    <CustomThemeContext.Provider value={{
      darkMode,
      handleDarkModeToggle
    }}>
      <ThemeProvider theme={theme}>
        { children }
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

export const useCustomTheme = () => useContext(CustomThemeContext);