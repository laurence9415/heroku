import { useState } from 'react';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { UpdateCprModal } from 'components/dashboard/utils/UpdateCprModal';
import { currencyFormatter } from 'utils/currencyFormatter';

export const CprCell = ({ cell }: any) => {
  const [open, setOpen] = useState(false)
  const { row, rowNode } = cell;

  /**
   * This check is to determine whether or not the cell is at the ad account
   * or campaign level. `rowNode.depth` refers to the expanded level, and anything
   * greater than 1 is either ad set (depth === 2) or ad (depth === 3)
   */
  if (rowNode.depth > 1) {
    return (
      <Typography variant="body2" lineHeight={1}>
        { currencyFormatter.format(parseFloat(row.cost_per_result_target)) }
      </Typography>
    )
  }

  return (
    <>
      { open &&
        <UpdateCprModal
          open={ open }
          onClose={ () => setOpen(false) }
          row={ row }
        />
      }
      <Box display="flex" alignItems="center">
        <Typography variant="body2" lineHeight={1}>
          { currencyFormatter.format(parseFloat(row.cost_per_result_target)) }
        </Typography>
        <IconButton
          aria-label="edit cpr target"
          size="small"
          onClick={ () => setOpen(true) }
          sx={{ ml: 1 }}
        >
          <EditRoundedIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </>
  )
}