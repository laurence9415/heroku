import { useState } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const VisibilityAdornment = ({
  show = false,
  onChange
}: {
  show: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}) => (
  <InputAdornment
    position='end'
    className='cursor-pointer'
    onClick={ () => onChange(!show) }
  >
    {
      show
        ? (
          <VisibilityRoundedIcon />
        ) : (
          <VisibilityOffRoundedIcon />
        )
    }
  </InputAdornment>
);

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Paper elevation={ 3 }>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={ 2 }
        p={ 3 }
        onSubmit={ (e) => { e.preventDefault() } }
      >
        <Typography variant="h6">Change Password</Typography>

        <TextField
          id="current-password"
          label="Current password"
          variant='outlined'
          size="small"
          type={ showCurrent ? "text" : "password"}
          value={ currentPassword }
          InputProps={{
            endAdornment: <VisibilityAdornment show={ showCurrent } onChange={ setShowCurrent } />
          }}
          onInput={ (e: ChangeEvent<HTMLInputElement>) =>
            setCurrentPassword(e.target.value)
          }
        />

        <TextField
          id="new-password"
          label="New password"
          variant='outlined'
          size="small"
          type={ showNew ? "text" : "password"}
          value={ newPassword }
          InputProps={{
            endAdornment: <VisibilityAdornment show={ showNew } onChange={ setShowNew } />
          }}
          onInput={ (e: ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
        />

        <TextField
          id="confirm-password"
          label="Confirm password"
          variant='outlined'
          size="small"
          type={ showConfirm ? "text" : "password"}
          value={ confirmPassword }
          InputProps={{
            endAdornment: <VisibilityAdornment show={ showConfirm } onChange={ setShowConfirm } />
          }}
          onInput={ (e: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />

        <Button
          type="submit"
          variant="contained"
          onClick={(e) => { e.preventDefault() }}
        >Change Password</Button>
      </Box>
    </Paper>);
}