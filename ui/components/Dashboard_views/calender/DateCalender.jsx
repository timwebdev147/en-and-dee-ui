import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function BasicDateCalendar() {
  return (
    <LocalizationProvider label="readOnly" dateAdapter={AdapterMoment}>
      <DateCalendar />
    </LocalizationProvider>
  );
}