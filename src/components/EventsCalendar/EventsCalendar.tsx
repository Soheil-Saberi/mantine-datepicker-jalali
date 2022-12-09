import React from 'react';
import { EventsMonth } from './EventsMonth/EventsMonth';
import { EventsCalendarEvent } from './types';

export interface EventsCalendarProps {
  /** Date that is currently displayed */
  date: Date;

  /** List of events that should be displayed */
  events?: EventsCalendarEvent[];
}

export function EventsCalendar({ date, events }: EventsCalendarProps) {
  return <EventsMonth month={date} events={events} />;
}
