import { useState } from 'react';

import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';

import { useGetColumnPresets } from 'api/preferences';

export const ColumnPresets = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { data: presets } = useGetColumnPresets({});

  const open = Boolean(anchorEl);
  const id = open ? 'column-presets' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id={ id }
        open={ open }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        MenuListProps={{
          'aria-labelledby': id,
          role: 'listbox',
          sx: { width: 250 }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuList>
          {
            presets?.map(({ label, id }, idx) =>
              <MenuItem
                key={ id }
                onClick={ () => handleMenuItemClick(idx) }
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <ListItemText>
                  { label }
                </ListItemText>
                { idx === selectedIndex &&
                  <ListItemIcon sx={{ minWidth: 'unset !important' }}>
                    <CheckRoundedIcon fontSize="small" color='primary' />
                  </ListItemIcon>
                }
              </MenuItem>
            )
          }
        </MenuList>
      </Menu>
      <Button
        onClick={ handleClick }
        startIcon={ <FolderSpecialRoundedIcon /> }
      >
        Column Presets
      </Button>
    </>
  )
}