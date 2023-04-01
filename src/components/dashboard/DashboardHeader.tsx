import { useEffect, useState, useRef } from 'react';
import type { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';

import { DateRangePicker } from 'components/dashboard/DateRangePicker';

export const DashboardHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const debouncedSearch = useRef(
    debounce((query: string) => {
      if (query === '') {
        searchParams.delete('search');
        setSearchParams(searchParams)
      } else {
        setSearchParams({ search: query }, { preventScrollReset: true });
      }
    }, 1000)
  ).current;

  useEffect(() => {
    return debouncedSearch.cancel
  }, [debouncedSearch])

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
    setSearch(event.target.value);
  };

  return (
    <>
      <Paper elevation={2} sx={{ padding: 2, marginBottom: 3 }}>
        <Box display="flex" gap={2}>
          <TextField
            id="account-search"
            label="Search Accounts"
            variant="outlined"
            size="small"
            sx={{ flex: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
            value={ search }
            onInput={handleSearchInput}
          />
          <DateRangePicker />
          <Button
            variant="contained"
            startIcon={<SyncRoundedIcon />}
            size="small"
            onClick={() => {
              // TODO: set up account syncing
            }}
          >
            Sync Accounts
          </Button>
        </Box>
      </Paper>
    </>
  )
}
