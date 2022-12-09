import dayjs from 'dayjs';
import { clamp } from '@mantine/hooks';
import { EventsCalendarEvent } from '../types';

interface GetMonthEvents {
  events: EventsCalendarEvent[];
  monthDays: Date[][];
}

function isEventInWeekRange(event: EventsCalendarEvent, weekStart: Date, weekEnd: Date) {
  const { startDate, endDate } = event;
  if (dayjs(startDate).isAfter(weekEnd) || dayjs(endDate).isBefore(weekStart)) {
    return false;
  }

  return true;
}

function getEventSpan(event: EventsCalendarEvent) {
  return dayjs(event.endDate).get('date') - dayjs(event.startDate).get('date');
}

function sortEvents(events: EventsCalendarEvent[]) {
  return events.sort((a, b) => getEventSpan(b) - getEventSpan(b));
}

export interface MonthEvent {
  event: EventsCalendarEvent;
  offset: number;
  span: number;
  nextWeekSpan: boolean;
  previousWeekSpan: boolean;
}

export function getMonthEvents({ events, monthDays }: GetMonthEvents) {
  const monthEvents: MonthEvent[][] = Array(monthDays.length)
    .fill(0)
    .map(() => []);
  const sortedEvents = sortEvents(events);

  monthDays.forEach((week, weekIndex) => {
    sortedEvents.forEach((event) => {
      if (isEventInWeekRange(event, week[0], week[6])) {
        const offset = dayjs(event.startDate).diff(week[0], 'days');
        const span = clamp(dayjs(event.endDate).diff(event.startDate, 'days'), 1, 7 - offset);
        const nextWeekSpan = dayjs(event.endDate).isAfter(week[6]);
        const previousWeekSpan = dayjs(event.startDate).isBefore(week[0]);
        monthEvents[weekIndex].push({ event, span, offset, nextWeekSpan, previousWeekSpan });
      }
    });
  });

  return monthEvents;
}
