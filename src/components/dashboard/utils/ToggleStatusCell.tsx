import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from "@mui/material/Switch";

import { useSetStatus } from 'api/adManagement';

const Status = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED'
}

export const ToggleStatusCell = ({ cell }: any) => {
  const { row, rowNode } = cell;
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(row.status === Status.ACTIVE);
  const { mutate: setStatus } = useSetStatus({
    onSuccess: () => {
      setOpen(false);
      setChecked(prev => !prev);
    },
    onError: () => {
      // Trigger error toast
    }
  })

  const handleSetStatus = () => {
    const [, campaignId, adSetId, adId] = row.path;

    setStatus({
      campaignId,
      adSetId,
      adId,
      status: checked ? Status.PAUSED : Status.ACTIVE
    });
  }

  /**
   * This check is to determine whether or not the cell is at ad account level.
   * `rowNode.depth` refers to the expanded level, and if depth === 0, we're at
   * the ad account level and don't want to render the status cell
   */
  if (rowNode.depth === 0) {
    return null
  }
  
  return (
    <>
      <Dialog
        open={ open }
        onClose={ () => setOpen(false) }
      >
        <DialogTitle>
          Are you sure you want to turn { row.name } { checked ? 'off' : 'on'}?
        </DialogTitle>
        <DialogActions>
          <Button onClick={ () => setOpen(false) }>Cancel</Button>
          <Button variant="contained" onClick={ handleSetStatus }>Turn { checked ? 'off' : 'on' }</Button>
        </DialogActions>
      </Dialog>
      <Switch
        size="small"
        checked={ checked }
        onChange={ () => setOpen(true) }
      />
    </>
  )
}