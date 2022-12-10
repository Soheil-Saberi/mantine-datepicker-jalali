import React from 'react';
import { JalaliCalendar } from './JalaliCalendar';
import 'dayjs/locale/fa';

export default { title: 'Calendar' };

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliCalendar />
    </div>
  );
}

export function MaxLevel() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliCalendar maxLevel="year" />
    </div>
  );
}

export function MinLevel() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliCalendar minLevel="year" />
    </div>
  );
}

export function NumberOfColumns() {
  return (
    <div style={{ padding: 40 }}>
      <div>1 column</div>
      <JalaliCalendar mb={50} mt="xs" />

      <div>2 columns</div>
      <JalaliCalendar numberOfColumns={2} mb={50} mt="xs" />

      <div>3 columns</div>
      <JalaliCalendar numberOfColumns={3} mb={50} mt="xs" />
    </div>
  );
}

export function InitialLevelYear() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliCalendar defaultLevel="year" />
    </div>
  );
}

export function InitialLevelDecade() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliCalendar defaultLevel="decade" />
    </div>
  );
}

export function JalaliCalender() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliCalendar locale="fa" firstDayOfWeek={6} weekendDays={[5]} />
    </div>
  );
}
