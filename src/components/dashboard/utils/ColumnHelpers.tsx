import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid-pro"

import { BudgetCell } from 'components/dashboard/utils/BudgetCell';
import { CprCell } from 'components/dashboard/utils/CprCell';
import { ToggleStatusCell } from 'components/dashboard/utils/ToggleStatusCell';

type ColumnMappings = GridColDef & { displayName?: string }

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const columnMappings: { [key in string]: ColumnMappings } = {
  name: {
    field: 'name',
    headerName: 'Name',
    displayName: 'Name',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 2
  },
  objective: {
    field: 'objective',
    headerName: 'Objective',
    displayName: 'Objective',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  status: {
    field: 'status',
    headerName: 'Status',
    displayName: 'Status',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    renderCell: (cell: any) => <ToggleStatusCell cell={ cell } />,
    flex: 1,
    minWidth: 75,
  },
  cpr_risk: {
    field: 'cpr_risk',
    headerName: 'Risk',
    displayName: 'Cost Per Result Risk',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  cost_per_result_target: {
    type: 'number',
    field: 'cost_per_result_target',
    headerName: 'Target',
    displayName: 'Cost Per Result Target',
    align: 'left',
    headerAlign: 'left',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    renderCell: (cell: any) => <CprCell cell={ cell } />,
    flex: 1,
    minWidth: 100,
  },
  daily_budget: {
    type: 'number',
    field: 'daily_budget',
    headerName: 'Budget',
    displayName: 'Budget',
    align: 'left',
    headerAlign: 'left',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    renderCell: (cell: any) => <BudgetCell cell={ cell } />,
    flex: 1,
    minWidth: 125,
  },
  amount: {
    type: 'number',
    field: 'amount',
    headerName: 'Amount',
    displayName: 'Amount',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    renderCell: ({ row }) => currencyFormatter.format(row.daily_budget),
    flex: 1,
    minWidth: 75,
  },
  spend: {
    type: 'number',
    field: 'spend',
    headerName: 'Spend',
    displayName: 'Spend',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    renderCell: ({ row }) => currencyFormatter.format(row.daily_budget),
    flex: 1,
    minWidth: 75,
  },
  result: {
    type: 'number',
    field: 'result',
    headerName: 'Result',
    displayName: 'Result',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  cpr: {
    type: 'number',
    field: 'cpr',
    headerName: 'CPR',
    displayName: 'Cost Per Result',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    flex: 1,
    minWidth: 75,
  },
  cpm: {
    type: 'number',
    field: 'cpm',
    headerName: 'CPM',
    displayName: 'Cost Per 1000 Impressions',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    flex: 1,
    minWidth: 75,
  },
  impressions: {
    type: 'number',
    field: 'impressions',
    headerName: 'Impressions',
    displayName: 'Impressions',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  frequency: {
    type: 'number',
    field: 'frequency',
    headerName: 'Frequency',
    displayName: 'Frequency',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  reach: {
    type: 'number',
    field: 'reach',
    headerName: 'Reach',
    displayName: 'Reach',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  ulc: {
    type: 'number',
    field: 'ulc',
    headerName: 'ULC',
    displayName: 'Unique Link Clicks',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  cpulc: {
    type: 'number',
    field: 'cpulc',
    headerName: 'CPULC',
    displayName: 'Cost Per Unique Link Click',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    flex: 1,
    minWidth: 75,
  },
  clicks: {
    type: 'number',
    field: 'clicks',
    headerName: 'Clicks',
    displayName: 'Clicks',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  cpc: {
    type: 'number',
    field: 'cpc',
    headerName: 'CPC',
    displayName: 'Cost Per Click (All)',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    flex: 1,
    minWidth: 75,
  },
  link_clicks: {
    type: 'number',
    field: 'link_clicks',
    headerName: 'Link Clicks',
    displayName: 'Link Clicks',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  cost_per_inline_link_click: {
    type: 'number',
    field: 'cost_per_inline_link_click',
    headerName: 'CPILC',
    displayName: 'Cost Per Link Click',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    flex: 1,
    minWidth: 75,
  },
  ccvr: {
    type: 'number',
    field: 'ccvr',
    headerName: 'CCVR',
    displayName: 'Copy Conversion Rate',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  cvr: {
    type: 'number',
    field: 'cvr',
    headerName: 'CVR',
    displayName: 'Conversion Rate',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  ctr: {
    type: 'number',
    field: 'ctr',
    headerName: 'CTR',
    displayName: 'Click Through Rate',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  kpi_status: {
    field: 'kpi_status',
    headerName: 'TLS',
    displayName: 'Traffic Light System',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
  currency: {
    field: 'currency',
    headerName: 'Currency',
    displayName: 'Currency',
    renderHeader: ({ colDef }: any) => renderHeader(colDef),
    flex: 1,
    minWidth: 75,
  },
}

const renderHeader = ({
  displayName,
  headerName }: {
    displayName: string,
    headerName: string
}) => (
  <Tooltip
    arrow
    disableFocusListener
    disableTouchListener
    placement="top-start"
    title={displayName}
  >
    <Typography variant="body2">{ headerName }</Typography>
  </Tooltip>
);

export const getCprRiskCellClass = (risk: string) => {
  if (risk === 'HIGH') {
    return 'text-red-500';
  }

  if (risk === 'MEDIUM') {
    return 'text-orange-500';
  }

  return '';
}