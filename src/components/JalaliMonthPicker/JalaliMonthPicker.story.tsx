import React, { useState } from 'react';
import { DatesRangeValue } from '../../types';
import { JalaliMonthPicker } from './JalaliMonthPicker';

export default { title: 'JalaliMonthPicker' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPicker />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPicker type="multiple" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPicker type="range" />
    </div>
  );
}

export function AllowDeselect() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPicker allowDeselect />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPicker
        value={value}
        onChange={setValue}
        numberOfColumns={3}
        columnsToScroll={1}
      />
      {value?.toISOString()}
    </div>
  );
}

export function ControlledRange() {
  const [value, setValue] = useState<DatesRangeValue>([null, null]);
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPicker
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
      <JalaliMonthPicker
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
