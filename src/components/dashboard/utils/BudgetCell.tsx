import { useState, ChangeEvent } from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CurrencyFormat from 'react-currency-format';

import { currencyFormatter } from 'utils/currencyFormatter';
import { useSetDailyBudget } from 'api/adManagement';

export const BudgetCell = ({ cell }: any) => {
  const { row, rowNode } = cell;

  const [isEditing, setIsEditing] = useState(false);
  const [budget, setBudget] = useState(row?.daily_budget || 0);

  const { mutate: updateBudget } = useSetDailyBudget({
    onSuccess: () => {
      setIsEditing(false);
    },
    onError: () => {
      // Trigger error toast
    }
  });

  const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.value);
  }

  const handleUpdateBudget = () => {
    const [, campaignId, adSetId, ] = row.path;

    updateBudget({
      campaignId,
      adSetId,
      dailyBudget: parseFloat(budget)
    })
  }

  /**
   * This check is to determine whether or not the cell is at the campaign
   * or ad set level. `rowNode.depth` refers to the expanded level, and anything
   * greater than 0 is either a campaign (depth === 1) or ad set (depth === 2)
   */
  if (rowNode.depth === 0 || rowNode.depth > 2) {
    return (
      <>{ currencyFormatter.format(row.daily_budget) }</>
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {
          isEditing
            ? (
              <>
                <CurrencyFormat
                  thousandSeparator
                  decimalScale={ 2 }
                  customInput={ TextField }
                  value={ budget }
                  onChange={ handleBudgetChange }
                  {...{
                    variant: 'standard' as any,
                    size: 'small' as any,
                    InputProps: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{
                            mr: 0.5,
                            '> p': {
                              fontSize: '0.9rem'
                            }
                          }}
                        >
                          $
                        </InputAdornment>
                      )
                    },
                    sx: {
                      'MuiInputBase-root *': {
                        fontSize: '0.9rem',
                      },
                      'input': {
                        fontSize: '0.9rem',
                        paddingBottom: 0.1,
                      }
                    }
                  }}
                />
                <IconButton
                  aria-label="edit cpr target"
                  size="small"
                  onClick={ handleUpdateBudget }
                >
                  <CheckRoundedIcon color="success" fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="edit cpr target"
                  size="small"
                  onClick={ () => setIsEditing(false) }
                >
                  <CloseRoundedIcon color="error" fontSize="inherit" />
                </IconButton>
              </>
            ) : (
              <>
                <Typography variant="body2" lineHeight={1}>
                  { currencyFormatter.format(row.daily_budget) }
                </Typography>
                <IconButton
                  aria-label="edit cpr target"
                  size="small"
                  onClick={ () => setIsEditing(true) }
                  sx={{ ml: 1 }}
                >
                  <EditRoundedIcon fontSize="inherit" />
                </IconButton>
              </>
            )
        }
      </Box>
    </>
  )
}