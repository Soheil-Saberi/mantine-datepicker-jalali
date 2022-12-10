import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import { Box, DefaultProps, useComponentDefaultProps, Selectors } from '@mantine/core';
import {
  JalaliCalendarHeader,
  CalendarHeaderStylesNames,
  CalendarHeaderSettings,
} from '../JalaliCalendarHeader';
import { useDatesContext } from '../JalaliDatesProvider';
import { JalaliMonth, MonthSettings, MonthStylesNames } from '../JalaliMonth';
import useStyles from './JalaliMonthLevel.styles';

export type MonthLevelStylesNames =
  | Selectors<typeof useStyles>
  | MonthStylesNames
  | CalendarHeaderStylesNames;

export interface MonthLevelSettings extends MonthSettings, CalendarHeaderSettings {
  /** dayjs label format to display month label or a function that returns month label based on month value, defaults to "MMMM YYYY" */
  monthLabelFormat?: string | ((month: Date) => React.ReactNode);
  locale?: string;
}

export interface JalaliMonthLevelProps
  extends DefaultProps<MonthLevelStylesNames>,
    MonthLevelSettings,
    React.ComponentPropsWithoutRef<'div'> {
  __staticSelector?: string;

  /** Month that is currently displayed */
  month: Date;

  /** aria-label for change level control */
  levelControlAriaLabel?: string;
}

const defaultProps: Partial<JalaliMonthLevelProps> = {
  monthLabelFormat: 'MMMM YYYY',
};

export const JalaliMonthLevel = forwardRef<HTMLDivElement, JalaliMonthLevelProps>((props, ref) => {
  const {
    // Month settings
    month,
    locale,
    firstDayOfWeek,
    weekdayFormat,
    weekendDays,
    getDayProps,
    excludeDate,
    minDate,
    maxDate,
    renderDay,
    hideOutsideDates,
    hideWeekdays,
    getDayAriaLabel,
    __getDayRef,
    __onDayKeyDown,
    __onDayClick,
    __onDayMouseEnter,

    // CalendarHeader settings
    __preventFocus,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelClick,
    nextDisabled,
    previousDisabled,
    hasNextLevel,
    levelControlAriaLabel,
    withNext,
    withPrevious,

    // Other props
    className,
    monthLabelFormat,
    classNames,
    styles,
    unstyled,
    __staticSelector,
    ...others
  } = useComponentDefaultProps('MonthLevel', defaultProps, props);

  const { classes, cx } = useStyles(null, {
    name: ['MonthLevel', __staticSelector],
    classNames,
    styles,
    unstyled,
  });

  const ctx = useDatesContext();

  const stylesApiProps = {
    classNames,
    styles,
    unstyled,
    __staticSelector: __staticSelector || 'MonthLevel',
  };

  const _nextDisabled =
    typeof nextDisabled === 'boolean'
      ? nextDisabled
      : maxDate
      ? !dayjs(month).endOf('month').isBefore(maxDate)
      : false;

  const _previousDisabled =
    typeof previousDisabled === 'boolean'
      ? previousDisabled
      : minDate
      ? !dayjs(month).startOf('month').isAfter(minDate)
      : false;

  return (
    <Box className={cx(classes.monthLevel, className)} ref={ref} {...others}>
      <JalaliCalendarHeader
        label={
          locale && locale === 'fa'
            ? new Intl.DateTimeFormat('fa-IR', { month: 'short' }).format(month)
            : typeof monthLabelFormat === 'function'
            ? monthLabelFormat(month)
            : dayjs(month)
                .locale(locale || ctx.locale)
                .format(monthLabelFormat)
        }
        locale={locale}
        className={classes.calendarHeader}
        __preventFocus={__preventFocus}
        nextIcon={nextIcon}
        previousIcon={previousIcon}
        nextLabel={nextLabel}
        previousLabel={previousLabel}
        onNext={onNext}
        onPrevious={onPrevious}
        onLevelClick={onLevelClick}
        nextDisabled={_nextDisabled}
        previousDisabled={_previousDisabled}
        hasNextLevel={hasNextLevel}
        levelControlAriaLabel={levelControlAriaLabel}
        withNext={withNext}
        withPrevious={withPrevious}
        {...stylesApiProps}
      />

      <JalaliMonth
        month={month}
        locale={locale}
        firstDayOfWeek={firstDayOfWeek}
        weekdayFormat={weekdayFormat}
        weekendDays={weekendDays}
        getDayProps={getDayProps}
        excludeDate={excludeDate}
        minDate={minDate}
        maxDate={maxDate}
        renderDay={renderDay}
        hideOutsideDates={hideOutsideDates}
        hideWeekdays={hideWeekdays}
        getDayAriaLabel={getDayAriaLabel}
        __getDayRef={__getDayRef}
        __onDayKeyDown={__onDayKeyDown}
        __onDayClick={__onDayClick}
        __onDayMouseEnter={__onDayMouseEnter}
        __preventFocus={__preventFocus}
        {...stylesApiProps}
      />
    </Box>
  );
});
