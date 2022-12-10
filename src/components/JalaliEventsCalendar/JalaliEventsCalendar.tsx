import React from 'react';
import { JalaliEventsMonth } from './EventsMonth/JalaliEventsMonth';
import { EventsCalendarEvent } from './types';

export interface JalaliEventsCalendarProps {
  /** Date that is currently displayed */
  date: Date;

  /** List of events that should be displayed */
  events?: EventsCalendarEvent[];
}

export function JalaliEventsCalendar({ date, events }: JalaliEventsCalendarProps) {
  return <JalaliEventsMonth month={date} events={events} />;
}
