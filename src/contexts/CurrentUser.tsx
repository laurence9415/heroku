import { createContext, useContext} from 'react';
import type { ReactElement } from 'react';

import { useGetCurrentUser } from 'api/users';

interface ContextProviderProps {
  children: ReactElement | ReactElement[];
}

interface CurrentUserContextProps {
  currentUser: any | undefined;
}

const CurrentUserContext = createContext<CurrentUserContextProps>({
  currentUser: undefined
});

export const CurrentUserProvider = ({ children }: ContextProviderProps) => {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <CurrentUserContext.Provider
      value={{ currentUser: currentUser?.data }}
    >
      { children }
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(CurrentUserContext);