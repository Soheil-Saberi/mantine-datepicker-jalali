import 'dayjs/locale/ru';
import 'dayjs/locale/fa';
import React, { useState } from 'react';
import { DatesRangeValue } from '../../types';
import { JalaliDatePicker } from './JalaliDatePicker';

export default { title: 'JalaliDatePicker' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePicker />
    </div>
  );
}

export function RuLocale() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePicker locale="ru" />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePicker type="multiple" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePicker type="range" defaultValue={[new Date(2022, 3, 11), null]} />
    </div>
  );
}

export function AllowDeselect() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePicker allowDeselect />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePicker value={value} onChange={setValue} numberOfColumns={3} columnsToScroll={1} />
      {value?.toISOString()}
    </div>
  );
}

export function ControlledRange() {
  const [value, setValue] = useState<DatesRangeValue>([null, null]);
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePicker
        type="range"
        value={value}
        onChange={setValue}
        numberOfColumns={3}
        columnsToScroll={1}
      />
      {value.map((date) => (date ? date.toISOString() : 'ns')).join(' – ')}
    </div>
  );
}

export function ControlledMultiple() {
  const [value, setValue] = useState<Date[]>([]);
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePicker
        type="multiple"
        value={value}
        onChange={setValue}
        numberOfColumns={3}
        columnsToScroll={1}
      />
      {value.map((date) => (date ? date.toISOString() : 'ns')).join(', ')}
    </div>
  );
}

export function JalaliJalaliDatePicker() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePicker locale="fa" firstDayOfWeek={6} weekendDays={[5]} />
    </div>
  );
}