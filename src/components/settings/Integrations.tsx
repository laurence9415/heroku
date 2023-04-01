import type { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import {
  SvgIconComponent,
  FacebookRounded,
  Google
} from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

import { FacebookLogin } from 'components/FacebookLogin';

const SUPPORTED_INTEGRATIONS: {
  name: string;
  id: string;
  Icon: SvgIconComponent;
  active: boolean;
  Component: ReactElement
}[] = [
  {
    name: 'Facebook',
    id: 'facebook',
    Icon: FacebookRounded,
    active: true,
    Component: <FacebookLogin textOnly />
  },
  {
    name: 'Google',
    id: 'google',
    Icon: Google,
    active: false,
    Component: (
      <Button
        variant="outlined"
        size="small"
        disabled
      >
        Coming Soon
      </Button>
    )
  }
]

export const Integrations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Handle integration fetch call
  const handleIntegration = (id: string) => {
    console.log(id)
  }

  return (
    <List className='w-full'>
      {
        SUPPORTED_INTEGRATIONS.map(({ name, id, Icon, active, Component }) =>
          <ListItem
            key={id}
            sx={{
              padding: 0,
              marginBottom: 2,
              width: '100%'
            }}
          >
            <Paper
              elevation={2}
              sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
                padding: 1,
                width: '100%'
              }}
            >
              <Box display='flex'>
                <Icon className='mr-2 self-center'/>
                <p className='self-center'>{ name }</p>
              </Box>
              <Box display="flex" gap={ 1 }>
                { id === 'facebook' && active &&
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={ () => {
                      searchParams.set('onboarding', 'true');
                      searchParams.set('onboarding_step', '2');
                      setSearchParams(searchParams);
                    }}
                  >
                    Manage Synced Ad Accounts
                  </Button>
                }
                { Component }
              </Box>
            </Paper>
          </ListItem>
        )
      }
    </List>
  )
}
