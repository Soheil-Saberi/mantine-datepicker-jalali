import React, { forwardRef } from 'react';
import {
  Box,
  DefaultProps,
  useComponentDefaultProps,
  Selectors,
  useContextStylesApi,
} from '@mantine/core';
import { getMonthDays, isSameMonth } from '../../Month';
import { DayOfWeek } from '../../../types';
import useStyles from './EventsMonth.styles';
import { useDatesContext } from '../../DatesProvider';
import { getWeekdayNames } from '../../WeekdaysRow';
import { EventsCalendarEvent } from '../types';
import { getMonthEvents } from './get-month-events';

export type EventsMonthStylesNames = Selectors<typeof useStyles>;

export interface EventsMonthProps
  extends DefaultProps<EventsMonthStylesNames>,
    React.ComponentPropsWithoutRef<'div'> {
  __staticSelector?: string;

  /** Month that should be displayed */
  month: Date;

  /** dayjs format for weekdays names, defaults to "dd" */
  weekdayFormat?: string;

  /** number 0-6, 0 – Sunday, 6 – Saturday, defaults to 1 – Monday */
  firstDayOfWeek?: DayOfWeek;

  /** dayjs locale, defaults to value defined in DatesProvider */
  locale?: string;

  /** List of events that should be displayed */
  events?: EventsCalendarEvent[];
}

const defaultProps: Partial<EventsMonthProps> = {
  __staticSelector: 'EventsMonth',
  weekdayFormat: 'dd',
  events: [],
};

export const EventsMonth = forwardRef<HTMLDivElement, EventsMonthProps>((props, ref) => {
  const {
    className,
    classNames,
    styles,
    unstyled,
    __staticSelector,
    month,
    firstDayOfWeek,
    weekdayFormat,
    locale,
    events,
    ...others
  } = useComponentDefaultProps('EventsMonth', defaultProps, props);

  const ctxStylesApi = useContextStylesApi();
  const stylesApi = {
    classNames: classNames || ctxStylesApi.classNames,
    styles: styles || ctxStylesApi.styles,
    unstyled: unstyled || ctxStylesApi.unstyled,
  };

  const { cx, classes } = useStyles(null, { ...stylesApi, name: __staticSelector });
  const ctx = useDatesContext();
  const monthDays = getMonthDays(month, ctx.getFirstDayOfWeek(firstDayOfWeek));
  const parsedEvents = getMonthEvents({ events, monthDays });
  console.log(parsedEvents);

  const rows = monthDays.map((row, rowIndex) => {
    const days = row.map((day, dayIndex) => (
      <div
        className={classes.eventsMonthDay}
        data-day
        data-outside={!isSameMonth(day, month) || undefined}
        key={dayIndex}
      >
        {day.getDate()}
      </div>
    ));

    return (
      <div className={classes.eventsMonthRow} key={rowIndex}>
        {days}
      </div>
    );
  });

  const weekdays = getWeekdayNames({
    locale: ctx.getLocale(locale),
    format: weekdayFormat,
    firstDayOfWeek: ctx.getFirstDayOfWeek(firstDayOfWeek),
  }).map((weekday) => (
    <div key={weekday} className={classes.eventsMonthWeekday}>
      {weekday}
    </div>
  ));

  return (
    <Box ref={ref} className={cx(classes.eventsMonth, className)} {...others}>
      <div className={classes.eventsMonthWeekdaysRow}>{weekdays}</div>
      {rows}
    </Box>
  );
});

EventsMonth.displayName = '@mantine/dates/EventsMonth';
