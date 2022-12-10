import React, { useState } from 'react';
import { DatesRangeValue } from '../../types';
import { JalaliYearPicker } from './JalaliYearPicker';

export default { title: 'JalaliYearPicker' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliYearPicker />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliYearPicker type="multiple" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliYearPicker type="range" />
    </div>
  );
}

export function AllowDeselect() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliYearPicker allowDeselect />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <div style={{ padding: 40 }}>
      <JalaliYearPicker value={value} onChange={setValue} numberOfColumns={3} columnsToScroll={1} />
      {value?.toISOString()}
    </div>
  );
}

export function ControlledRange() {
  const [value, setValue] = useState<DatesRangeValue>([null, null]);
  return (
    <div style={{ padding: 40 }}>
      <JalaliYearPicker
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
      <JalaliYearPicker
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
