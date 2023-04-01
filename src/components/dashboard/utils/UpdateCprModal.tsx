import { useState, ChangeEvent } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import CurrencyFormat from 'react-currency-format';

import { useSetCprAndThreshold } from 'api/adManagement';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface UpdateCprModalProps {
  onClose: () => void;
  open: boolean;
  row: any;
}

export const UpdateCprModal = ({ onClose, open, row }: UpdateCprModalProps) => {
  const [target, setTarget] = useState(row.cost_per_result_target);
  const [threshold, setThreshold] = useState(row.cost_per_result_threshold_percentage);

  const { mutate: updateCpr } = useSetCprAndThreshold({
    onSuccess: () => {
      // Create a toast system with Snackbar
      onClose()
    },
    onError: () => {
      // Trigger error toast
    },
  })

  const calculatedThreshold = currencyFormatter.format(
    (parseFloat(target.replace(',', '')) * (threshold/100 + 1))
  );
  const calculatedTarget = currencyFormatter.format(parseFloat(target.replace(',', '')));

  const handleTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTarget(event.target.value);
  }

  const handleThresholdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThreshold(event.target.value);
  }

  const handleUpdateCpr = () => {
    const [adAccountId, campaignId] = row.path;

    updateCpr({
      adAccountId,
      campaignId,
      target: parseFloat(target.replace(',', '')),
      threshold: parseFloat(threshold)
    })
  }

  return (
    <Dialog open={ open } onClose={ onClose }>
      <DialogTitle>
        Update CPR targets for { row.name }
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box display="flex" my={1} gap={2}>
          <CurrencyFormat
            thousandSeparator
            decimalScale={ 2 }
            customInput={ TextField }
            onChange={ handleTargetChange }
            value={ target }
            {...{
              id: 'target',
              label: 'Set CPR target',
              variant: 'outlined' as any,
              size: 'small' as any,
              InputProps: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }
            }}
          />
          <TextField
            id="threshold"
            label="Set CPR threshold"
            variant="outlined"
            size="small"
            value={threshold}
            onInput={ handleThresholdChange }
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
          />
        </Box>
        <Stack mt={2} gap={2}>
          <Alert
            icon={ false }
            color="error"
            sx={{ display: 'flex', justifyContent: 'center'}}
          >
            CPR &#x3e; { calculatedThreshold }
          </Alert>
          <Alert
            icon={ false }
            color="warning"
            sx={{ display: 'flex', justifyContent: 'center'}}
          >
            { calculatedTarget } &#x2264; CPR &#x2264; { calculatedThreshold }
          </Alert>
        </Stack>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button onClick={ onClose }>Cancel</Button>
        <Button
          variant="contained"
          onClick={ handleUpdateCpr }
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}
