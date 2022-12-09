import React from 'react';

export interface EventsCalendarEvent {
  startDate: Date | string;
  endDate: Date | string;
  name: React.ReactNode;
}
