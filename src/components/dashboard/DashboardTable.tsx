import { useCallback,useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { DataGridPro, GridColDef, DataGridProProps } from '@mui/x-data-grid-pro';

import { ErrorBoundary } from 'components/ErrorBoundary';
import { CustomToolBar } from 'components/dashboard/utils/CustomToolBar';
import { columnMappings, getCprRiskCellClass } from 'components/dashboard/utils/ColumnHelpers';
import { useAdAccountsInsightsQuery } from 'api/adInsights';
import { useCurrentUser } from 'contexts/CurrentUser';

const groupingColDef: DataGridProProps['groupingColDef'] = {
  headerName: 'Name/ID',
  flex: 2,
  minWidth: 300,
  // renderHeader: ({ colDef }: any) => <Box ml={5}>{ colDef.headerName }</Box>,
  renderHeader: ({ colDef }: any) => (
    <Box display="flex" flexDirection="column" alignItems="flex-start" ml={5}>
      <Typography variant="body2" lineHeight={1}>Name</Typography>
      <Typography variant="caption"lineHeight={1}>ID</Typography>
    </Box>
  ),
  renderCell: (cell: any) => {
    const isExpanded = cell.rowNode.childrenExpanded;
    const handleExpandableButtonClick = () => {
      cell.api.setRowChildrenExpansion(cell.id, !isExpanded);
    }
    const depth = (cell.rowNode.depth * 3) + 1;

    return (
      <Box display="flex" alignItems="center">
        <IconButton
          aria-label={ isExpanded ? 'collapse' : 'expand' }
          size="small"
          sx={{
            height: 30,
            width: 30,
            visibility: cell?.rowNode?.children?.length ? 'visible' : 'hidden'
          }}
          onClick={ handleExpandableButtonClick }
        >
          {
            isExpanded
              ? <ExpandMoreRoundedIcon fontSize="inherit" />
              : <ChevronRightRoundedIcon fontSize="inherit" />
          }
        </IconButton>
        <Box display="flex" flexDirection="column" alignItems="flex-start" ml={depth}>
          <Typography variant="body2" lineHeight={1}>{ cell.row.name }</Typography>
          <Typography variant="caption" lineHeight={1}>{ cell.row.id }</Typography>
        </Box>
      </Box>
    )
  }
}

export const DashboardTable = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useAdAccountsInsightsQuery({
    search: searchParams.get('search'),
    start_date: searchParams.get('start_date'),
    end_date: searchParams.get('end_date'),
  });
  const { currentUser } = useCurrentUser(); // TODO: Pull currentUser into a Context

  const columnVisibilityModel: { [key in string]: boolean } = useMemo(
    () => currentUser?.preferences?.columnVisibility,
    [currentUser]
  );

  const columns: GridColDef[] = useMemo(() => {
    const visibleCols: string[] = Object.entries(
      currentUser?.preferences?.columnVisibility || {}
    )
    .filter(([key, value]) => value)
    .map(([key, value]) => key);

    return visibleCols.map(col => columnMappings[col])
  }, [currentUser]);

  const rows = useMemo(() => {
    if (data) {
      const { data: insights } = data;
      const _rows: any[] = [];

      insights.forEach((adAccount: any) => {
        const adAccountRow = { ...adAccount, path: [adAccount.id], id: adAccount.id };
        delete adAccountRow.campaigns;
        _rows.push(adAccountRow);

        adAccount.campaigns.forEach((campaign: any) => {
          const campaignRow = {
            ...campaign,
            path: [adAccount.id, campaign.id]
          };
          delete campaignRow.adsets;
          _rows.push(campaignRow);

          campaign.adsets.forEach((adset: any) => {
            const adsetRow = {
              ...adset,
              path: [adAccount.id, campaign.id, adset.id]
            };
            delete adsetRow.ads;
            _rows.push(adsetRow);

            adset.ads.forEach((ad: any) => {
              const adRow = {
                ...ad,
                path: [
                  adAccount.id,
                  campaign.id,
                  adset.id,
                  ad.id
                ]
              };
              _rows.push(adRow);
            })
          })
        })
      })

      return _rows;
    }

    return []
  }, [data]);

  const slots = useMemo(() => ({
    toolbar: CustomToolBar,
    loadingOverlay: LinearProgress,
  }), []);

  const getTreeDataPath = useCallback(({ path }: any) => path, []);

  return (
    <ErrorBoundary fallback={<p>There was an issue rendering your accounts</p>}>
      <Paper elevation={2} sx={{ flex: 1, padding: 2}}>
        <DataGridPro
          treeData
          getTreeDataPath={ getTreeDataPath }
          columns={ columns }
          rows={ rows }
          loading={ isLoading }
          checkboxSelection
          disableRowSelectionOnClick
          hideFooterRowCount
          autoPageSize
          groupingColDef={ groupingColDef }
          slots={ slots }
          // We'd want to grab the user's preferences for the model and pass it into this.
          /// This would be where we establish presets as well
          columnVisibilityModel={columnVisibilityModel}
          getCellClassName={({ row }) => getCprRiskCellClass(row.cpr_risk) } // How we can define color status
          onColumnOrderChange={(...args) => console.log(args)}
          onColumnVisibilityModelChange={(...args) => console.log(args)}

          /**
           * Some props we might want to use in the future
          */
          // disableColumnFilter
          // disableColumnMenu
          // disableColumnSelector
          // onRowSelectionModelChange={(...row) => console.log('selected rows', row)}
          // defaultGroupingExpansionDepth={-1} "Expand All Button"?
          // rowSelectionModel={selectedAccounts.map(({ id }) => id)} // Good for setting preselected rows
          // onColumnResize
          // onColumnWidthChange
          // onPreferencePanelClose={(...args) => console.log(args)}
          // onPreferencePanelOpen={(...args) => console.log(args)}
          // onColumnHeaderClick={(...args) => console.log(args)}
          // onColumnVisibilityModelChange={(...args) => console.log('changed column visibility', args)}
        />
      </Paper>
    </ErrorBoundary>
  )
}
