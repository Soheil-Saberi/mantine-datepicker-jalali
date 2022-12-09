import React from 'react';
import { EventsCalendar } from './EventsCalendar';
import { EventsCalendarEvent } from './types';

export default { title: 'EventsCalendar' };

const events: EventsCalendarEvent[] = [
  { startDate: new Date(2022, 11, 2), endDate: new Date(2022, 11, 2), name: 'Test event 1' },
];

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <EventsCalendar events={events} date={new Date(2022, 11, 1)} />
    </div>
  );
}
