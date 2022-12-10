import 'dayjs/locale/ru';
import React from 'react';
import { JalaliWeekdaysRow, JalaliWeekdaysRowProps } from './JalaliWeekdaysRow';

export default { title: 'WeekdaysRow' };

function Wrapper(props: JalaliWeekdaysRowProps) {
  return (
    <table>
      <thead>
        <JalaliWeekdaysRow {...props} />
      </thead>
    </table>
  );
}

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <Wrapper />
    </div>
  );
}

export function Locale() {
  return (
    <div style={{ padding: 40 }}>
      <Wrapper locale="ru" />
    </div>
  );
}

export function DayOfWeek() {
  return (
    <div style={{ padding: 40 }}>
      <Wrapper firstDayOfWeek={0} />
      <Wrapper firstDayOfWeek={6} />
      <Wrapper firstDayOfWeek={4} />
    </div>
  );
}
