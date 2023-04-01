import { useState } from 'react';
import { useNavigate, matchPath, useLocation } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import {
  DashboardRounded,
  SummarizeRounded
} from '@mui/icons-material';

import { Drawer } from 'components/navbar/Drawer';
import { ProfileMenu } from 'components/navbar/ProfileMenu';
import { NavMenuItems } from 'types';

const NAV_MENU_ITEMS: NavMenuItems[] = [
  {
    title: "Dashboard",
    path: '/dashboard',
    Icon: DashboardRounded,
  },
  {
    title: "Reporting",
    path: '/reporting',
    Icon: SummarizeRounded,
    disabled: true,
  },
];

/**
 * 
 * TODO: Move away from MUI and implement our own drawer that's absolutely positioned
 * 
 */

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseOver={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }
      }}
    >
      <Stack>
        <List>
          <ListItem>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : 'auto',
                justifyContent: 'center'
              }}
            >
              <img alt="smart ass metrics logo" src="/assets/images/logo.png" className='h-8 w-8' />
            </ListItemIcon>
            <ListItemText sx={{ opacity: open ? 1 : 0, whiteSpace: 'nowrap' }}>
              <p className='font-sans font-light'>
                <span className='font-sans font-semibold text-brand'>SMARTASS</span>
                METRICS
              </p>
            </ListItemText>
          </ListItem>
        </List>

        <Divider />

        <List>
          {
            NAV_MENU_ITEMS.map(({ title, path, Icon, disabled }, idx) =>
              <ListItem
                key={`${path}-${idx}`}
                disablePadding
              >
                <ListItemButton
                  disabled={ disabled }
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => navigate(path)}
                  selected={!!matchPath(path, pathname)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            )
          }
        </List>
      </Stack>

      <ProfileMenu open={ open } />
    </Drawer>
  );
};
