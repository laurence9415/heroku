import { useState } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { LocalizationProvider, DateRange } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker as MUIDateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { PickersShortcutsItem } from '@mui/x-date-pickers/PickersShortcuts';
import TextField from '@mui/material/TextField';

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: 'Today',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('day'), today];
    },
  },
  {
    label: 'Yesterday',
    getValue: () => {
      const today = dayjs();
      const yesterday = today.subtract(1, 'day');
      return [yesterday.startOf('day'), yesterday.endOf('day')];
    },
  },
  {
    label: 'Last 3 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(3, 'day'), today];
    },
  },
  {
    label: 'Last 7 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, 'day'), today];
    },
  },
  {
    label: 'Last 14 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(14, 'day'), today];
    },
  },
  {
    label: 'This Week',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('week'), today.endOf('week')];
    },
  },
  {
    label: 'Last Week',
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, 'day');
      return [prevWeek.startOf('week'), prevWeek.endOf('week')];
    },
  },
  {
    label: 'This Month',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('month'), today.endOf('month')];
    },
  },
  {
    label: 'Last Month',
    getValue: () => {
      const today = dayjs();
      const lastMonth = today.subtract(1, 'month');
      return [lastMonth.startOf('month'), lastMonth.endOf('month')];
    },
  },
  {
    label: 'This Year',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('year'), today];
    },
  },
  { label: 'Reset', getValue: () => [null, null] },
];

// TODO: Potentially move this as a part of table filtering instead?
const DATE_FORMAT = "YYYY-MM-DD"

export const DateRangePicker = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState<DateRange<Dayjs>>([
    dayjs(searchParams.get('start_date')).startOf('day'),
    dayjs(searchParams.get('end_date')),
  ]);

  const handleDateAccept = ([startDate, endDate]: DateRange<Dayjs>) => {
    setSearchParams({
      start_date: startDate!.format(DATE_FORMAT),
      end_date: endDate!.format(DATE_FORMAT),
    }, { preventScrollReset: true })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDateRangePicker
        value={ value }
        calendars={2}
        slotProps={{
          shortcuts: {
            items: shortcutsItems,
          },
          actionBar: { actions: ['clear', 'cancel', 'accept'] },
        }}
        slots={{
          textField: (props) => <TextField size="small" {...props} />
        }}
        onChange={ (newValue) => setValue(newValue) }
        onAccept={ handleDateAccept }
      />
    </LocalizationProvider>
  )
}
