'use client';

import {DayPicker as ReactDayPicker} from 'react-day-picker';
import {format} from 'date-fns';
import 'react-day-picker/style.css';

interface MyDayPickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function MyDayPicker({selectedDate, onDateChange}: MyDayPickerProps) {
  return (
    <ReactDayPicker
      mode="single"
      selected={selectedDate}
      onSelect={onDateChange}
    />
  );
}
