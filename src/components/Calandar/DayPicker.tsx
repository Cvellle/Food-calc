'use client';

import {DayPicker as ReactDayPicker} from 'react-day-picker';
import {format} from 'date-fns';
import {useEffect, useState} from 'react';

import 'react-day-picker/style.css';

export function MyCalendar() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (selected) {
      const dateStr = format(selected, 'yyyy-MM-dd');
    }
  }, [selected]);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      <div className="border rounded-xl p-4 bg-white shadow-sm h-fit">
        <ReactDayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          // classNames or style
        />
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">
          Obroci za:{' '}
          {selected ? format(selected, 'dd.MM.yyyy') : 'Izaberite datum'}
        </h2>
      </div>
    </div>
  );
}
