import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import CurrencyFormat from 'react-currency-format';
import debounce from 'lodash.debounce';

import { useOnboardingContext } from 'contexts/OnboardingContext';
import { currencyFormatter } from 'utils/currencyFormatter';
import type { AdAccounts } from 'types';

const inputStyles = {
  'MuiInputBase-root *': {
    fontSize: '0.9rem',
    flex: 1,
  },
  'input': {
    fontSize: '0.9rem',
    paddingBottom: 0.1,
    textAlign: 'center',
    '&::placeholder': {
      fontSize: 11
    }
  }
}

const Alert = styled(MuiAlert)(
  () => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    '.MuiAlert-message': {
      padding: '0'
    }
  })
)

export const SetAccountLevelCpr = () => {
  const {
    selectedAccounts,
    globalCpr,
    setGlobalCpr,
    globalThreshold,
    setGlobalThreshold,
    accountLevelCprOverrides,
    addAccountLevelCprOverride,
    removeAccountLevelCprOverride
  } = useOnboardingContext();
  const [filteredAccounts, setFilteredAccounts] = useState<AdAccounts[]>(selectedAccounts);
  const [search, setSearch] = useState('');

  useEffect(() => {
    debounce(() => {
      const filtered = selectedAccounts?.filter(({ name, id }) =>
        name.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
        id.toLowerCase().indexOf(search.toLowerCase()) >= 0
      );

      setFilteredAccounts(filtered || []);
    }, 500)()
  }, [search, selectedAccounts, filteredAccounts])

  const calculatedThreshold = currencyFormatter.format(
    (parseInt(globalCpr.replace(',', '') || '0') * (parseInt(globalThreshold || '1')/100 + 1))
  );
  const calculatedTarget = currencyFormatter.format(parseFloat(globalCpr.replace(',', '')) || 0);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Account ID', flex: 1 },
    { field: 'name', headerName: 'Account Name', flex: 1 },
    {
      field: 'cpr',
      headerName: 'Override Account-level CPR',
      headerAlign: 'center',
      flex: 3,
      renderCell: ({ row }) => {
        const target = accountLevelCprOverrides[row.id]?.target ?? globalCpr;
        const threshold = accountLevelCprOverrides[row.id]?.threshold ?? globalThreshold;
        const calculatedLocalThreshold = currencyFormatter.format(
          (parseInt(target.replace(',', '') || '0') * (parseInt(threshold || '1')/100 + 1))
        );
        const calculatedLocalTarget = currencyFormatter.format(parseFloat(target.replace(',', '')) || 0);

        return (
          <Box display="flex" gap={ 1 } alignItems="center">
            <CurrencyFormat
              thousandSeparator
              decimalScale={ 2 }
              customInput={ TextField }
              value={ accountLevelCprOverrides[row.id]?.target || '' }
              defaultValue={ accountLevelCprOverrides[row.id]?.target ?? globalCpr }
              onChange={ (e: ChangeEvent<HTMLInputElement>) => {
                const overrides = { ...accountLevelCprOverrides };
                const override = overrides[row.id];

                if (override) {
                  if (e.target.value === '' && override.threshold === '') {
                    return removeAccountLevelCprOverride(row.id);
                  }

                  override.target = e.target.value;
                } else {
                  overrides[row.id] = {
                    target: e.target.value,
                    threshold: globalThreshold
                  }
                }

                addAccountLevelCprOverride(overrides);
              }}
              {...{
                id: `${row.id}-target`,
                variant: 'standard' as any,
                size: 'small' as any,
                placeholder: "Override target",
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
                sx: inputStyles
              }}
            />
            <TextField
              id={ `${row.id}-target` }
              inputProps={{ style: { textAlign: 'center' }}}
              value={accountLevelCprOverrides[row.id]?.threshold || ''}
              defaultValue={ accountLevelCprOverrides[row.id]?.threshold ?? globalThreshold }
              variant="standard"
              size="small"
              sx={ inputStyles }
              placeholder="Override threshold"
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                const overrides = { ...accountLevelCprOverrides };
                const override = overrides[row.id]

                if (override) {
                  if (e.target.value === '' && override?.target === '') {
                    return removeAccountLevelCprOverride(row.id);
                  }

                  override.threshold = e.target.value;
                } else {
                  overrides[row.id] = {
                    target: globalCpr,
                    threshold: e.target.value,
                  }
                }

                addAccountLevelCprOverride(overrides);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      mr: 0.5,
                      '> p': {
                        fontSize: '0.9rem'
                      }
                    }}
                  >
                    %
                  </InputAdornment>
                )
              }}
            />
            <Alert
              icon={ false }
              color="warning"
            >
              { calculatedLocalTarget } &#x2264; CPR &#x2264; { calculatedLocalThreshold }
            </Alert>
            <Alert
              icon={ false }
              color="error"
            >
              CPR &#x3e; { calculatedLocalThreshold }
            </Alert>
          </Box>
        );
      }
    },
    // { field: 'threshold', headerName: 'CPR Threshold ($)', flex: 1, headerAlign: 'right', align: 'right' }
  ];

  const rows = useMemo(() => {
    return filteredAccounts.map(account => {
      const cpr = accountLevelCprOverrides[account.id]?.target || globalCpr || '0';
      // const threshold = currencyFormatter.format(
      //   parseInt(`${parseFloat(cpr) * (parseFloat(`${parseFloat(globalThreshold || '0')/100}`) + 1)}`)
      // );

      return { ...account, cpr }
    })
  }, [filteredAccounts, accountLevelCprOverrides, globalCpr, globalThreshold])

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleGlobalCprChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGlobalCpr(event.target.value);
  };

  const handleGlobalThresholdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGlobalThreshold(event.target.value)
  };

  return (
    <Stack height="100%" width="100%" gap={2}>
      <Box display="flex" gap={2}>
        <TextField
          required
          id="global-cpr-override"
          label="Set global CPR"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          value={globalCpr}
          onInput={handleGlobalCprChange}
        />
        <TextField
          required
          id="global-threshold"
          label="Set global CPR threshold"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
          value={globalThreshold}
          onInput={handleGlobalThresholdChange}
        />
        <Alert
          icon={ false }
          color="warning"
        >
          { calculatedTarget } &#x2264; CPR &#x2264; { calculatedThreshold }
        </Alert>
        <Alert
          icon={ false }
          color="error"
       >
          CPR &#x3e; { calculatedThreshold }
        </Alert>
      </Box>
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
        rows={rows}
        hideFooter
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        hideFooterRowCount
        autoPageSize
      />
    </Stack>
  )
}
