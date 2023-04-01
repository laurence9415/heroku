import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  Brightness4Rounded,
  Brightness7Rounded,
  LogoutRounded,
  PersonRounded,
  SettingsRounded,
} from '@mui/icons-material';
import { useSignOut } from 'react-auth-kit';

import { useLogoutMutation } from 'api/auth';
import { useCurrentUser } from 'contexts/CurrentUser';
import { useCustomTheme } from 'contexts/CustomTheme';
import { NavMenuItems } from 'types';

const PROFILE_MENU_ITEMS: NavMenuItems[] = [
  {
    title: "Profile",
    path: '/profile',
    Icon: PersonRounded,
  },
  {
    title: "Settings",
    path: '/settings',
    Icon: SettingsRounded,
  },
];

interface ProfileMenuProps {
  open: boolean;
}

export const ProfileMenu = ({ open }: ProfileMenuProps) => {
  const signOut = useSignOut();
  const { currentUser } = useCurrentUser();
  const { darkMode, handleDarkModeToggle } = useCustomTheme();
  const { mutate: logout } = useLogoutMutation({
    onSuccess: () => {
      signOut();
      navigate('/login');
    }
  });
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <List>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton
            onClick={ handleClick }
            sx={{
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : 'auto',
                justifyContent: 'center'
              }}
            >
              <PersonRounded color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={ currentUser?.name }
              secondary={ currentUser?.email }
              sx={{ opacity: open ? 1 : 0, whiteSpace: 'nowrap' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Menu
        id="account-menu"
        open={ menuOpen }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            width: 200
          }
        }}
      >
        {
          PROFILE_MENU_ITEMS.map(({ title, path, Icon, disabled }, idx) =>
            <MenuItem key={ path } onClick={ () => navigate(path) }>
              <ListItemIcon><Icon color="primary" /></ListItemIcon>
              <ListItemText>{ title }</ListItemText>
            </MenuItem>
          )
        }
        {/* <Divider />
        <MenuItem key="dark-mode-selector" onClick={ handleDarkModeToggle }>
          <ListItemIcon>
            { darkMode
                ? <Brightness7Rounded color="primary" />
                : <Brightness4Rounded color="primary" />
            }
          </ListItemIcon>
          <ListItemText>
            { darkMode ? 'Light ' : 'Dark ' } mode
          </ListItemText>
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={ () => logout() }>
          <ListItemIcon><LogoutRounded color="primary" /></ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}