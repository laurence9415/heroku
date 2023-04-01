import { ChangeEvent, useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGridPro, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid-pro';
import debounce from 'lodash.debounce';

import { useAdAccountsQuery } from 'api/adInsights';
import { useOnboardingContext } from 'contexts/OnboardingContext';
import type { AdAccounts } from 'types';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Account ID', width: 150 },
  { field: 'name', headerName: 'Account Name', width: 300 },
];

export const AccountSelection = () => {
  const { data: accounts, isLoading } = useAdAccountsQuery();
  const { selectedAccounts, setSelectedAccounts } = useOnboardingContext();
  const [filteredAccounts, setFilteredAccounts] = useState<AdAccounts[]>(
    accounts?.data || []
  );
  const [search, setSearch] = useState('');
  const [shouldCallAccountSelect, setShouldCallAccountSelect] = useState(false);

  useEffect(() => {
    /**
     * We need to set this because DataGrid, when initialized, calls
     * handleAccountSelect, clearing the selectedAccounts value
     */
    setShouldCallAccountSelect(true);
  }, [])

  useEffect(() => {
    setFilteredAccounts(accounts?.data || []);
  }, [accounts]);

  useEffect(() => {
    debounce(() => {
      const filtered = accounts?.data?.filter(({ name, id }) =>
        name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        id.toLowerCase().indexOf(search.toLowerCase()) >= 0
      );

      setFilteredAccounts(filtered || []);
    }, 500)()
  }, [accounts, search])

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAccountSelect = (selected: GridRowSelectionModel, ...arg: any) => {
    if (shouldCallAccountSelect) {
      const selectedSet = new Set(selected as string[])

      setSelectedAccounts(
        accounts?.data?.filter(account => selectedSet.has(account.id)) || []
      )
    }
  }
  
  let content;

  if (accounts?.data?.length === 0) {
    content = (
      <Typography variant='h2'>You don't have any accounts</Typography>
    )
  }
  
  if (accounts && accounts?.data?.length > 0) {
    content = (
      <Stack display="flex" flexDirection="column" height="100%" gap={2}>
        <TextField
          id="account-search"
          label="Search Accounts"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
          value={search}
          onInput={handleSearchInput}
        />
        <DataGridPro
          columns={columns}
          rows={filteredAccounts}
          loading={isLoading}
          checkboxSelection
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          hideFooterRowCount
          autoPageSize
          rowSelectionModel={selectedAccounts.map(({ id }) => id)}
          onRowSelectionModelChange={handleAccountSelect}
        />
      </Stack>
    )
  }

  return (
    <Stack
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <Typography variant="h5" mb={2}>Select Accounts to Sync</Typography>
      { content }
    </Stack>
  )
}
