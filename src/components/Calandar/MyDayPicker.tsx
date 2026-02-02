'use client';

import {DayPicker as ReactDayPicker} from 'react-day-picker';
import 'react-day-picker/style.css';

interface MyDayPickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function MyDayPicker({selectedDate, onDateChange}: MyDayPickerProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="h-[300px] sm:h-[340px]">
        <ReactDayPicker
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          className="
            scale-[0.85] sm:scale-100
            origin-top
            
            text-sm
          "
          classNames={{
            months: 'flex justify-center',
            month: 'space-y-2',
            caption: 'mb-1',
            table: 'border-collapse',
            head_cell: 'px-1 py-0.5 text-xs',
            cell: 'p-0',
            day: 'h-8 w-8 sm:h-9 sm:w-9 p-0'
          }}
        />
      </div>
    </div>
  );
}
