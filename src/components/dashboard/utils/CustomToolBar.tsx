import Box from '@mui/material/Box';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { ColumnPresets } from 'components/dashboard/utils/ColumnPresets';

export const CustomToolBar = () => {
  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        'button': { 
          lineHeight: 1 
          }
        }
      }
    >
      <Box display="flex" gap={1}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Box>
      
      <ColumnPresets />
    </GridToolbarContainer>
  )
}
