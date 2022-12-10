import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import { Box, DefaultProps, useComponentDefaultProps, Selectors } from '@mantine/core';
import {
  JalaliCalendarHeader,
  CalendarHeaderStylesNames,
  CalendarHeaderSettings,
} from '../JalaliCalendarHeader';
import { useDatesContext } from '../JalaliDatesProvider';
import { MonthsListSettings, MonthsListStylesNames, JalaliMonthsList } from '../JalaliMonthsList';
import useStyles from './JalaliYearLevel.styles';

export type YearLevelStylesNames =
  | Selectors<typeof useStyles>
  | MonthsListStylesNames
  | CalendarHeaderStylesNames;

export interface YearLevelSettings extends MonthsListSettings, CalendarHeaderSettings {
  /** dayjs label format to display year label or a function that returns year label based on year value, defaults to "YYYY" */
  yearLabelFormat?: string | ((year: Date) => React.ReactNode);
  locale?: string;
}

export interface JalaliYearLevelProps
  extends DefaultProps<YearLevelStylesNames>,
    YearLevelSettings,
    React.ComponentPropsWithoutRef<'div'> {
  __staticSelector?: string;

  /** Year that is currently displayed */
  year: Date;

  /** aria-label for change level control */
  levelControlAriaLabel?: string;
}

const defaultProps: Partial<JalaliYearLevelProps> = {
  yearLabelFormat: 'YYYY',
};

export const JalaliYearLevel = forwardRef<HTMLDivElement, JalaliYearLevelProps>((props, ref) => {
  const {
    // MonthsList settings
    year,
    locale,
    minDate,
    maxDate,
    monthsListFormat,
    getMonthControlProps,
    __getControlRef,
    __onControlKeyDown,
    __onControlClick,
    __onControlMouseEnter,

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
    yearLabelFormat,
    classNames,
    styles,
    unstyled,
    __staticSelector,
    ...others
  } = useComponentDefaultProps('YearLevel', defaultProps, props);

  const { classes, cx } = useStyles(null, {
    name: ['YearLevel', __staticSelector],
    classNames,
    styles,
    unstyled,
  });

  const ctx = useDatesContext();

  const stylesApiProps = {
    classNames,
    styles,
    unstyled,
    __staticSelector: __staticSelector || 'YearLevel',
  };

  const _nextDisabled =
    typeof nextDisabled === 'boolean'
      ? nextDisabled
      : maxDate
      ? !dayjs(year).endOf('year').isBefore(maxDate)
      : false;

  const _previousDisabled =
    typeof previousDisabled === 'boolean'
      ? previousDisabled
      : minDate
      ? !dayjs(year).startOf('year').isAfter(minDate)
      : false;

  return (
    <Box className={cx(classes.yearLevel, className)} ref={ref} {...others}>
      <JalaliCalendarHeader
        label={
          locale && locale === 'fa'
            ? new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(year)
            : typeof yearLabelFormat === 'function'
            ? yearLabelFormat(year)
            : dayjs(year)
                .locale(locale || ctx.locale)
                .format(yearLabelFormat)
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

      <JalaliMonthsList
        year={year}
        locale={locale}
        minDate={minDate}
        maxDate={maxDate}
        monthsListFormat={monthsListFormat}
        getMonthControlProps={getMonthControlProps}
        __getControlRef={__getControlRef}
        __onControlKeyDown={__onControlKeyDown}
        __onControlClick={__onControlClick}
        __onControlMouseEnter={__onControlMouseEnter}
        __preventFocus={__preventFocus}
        {...stylesApiProps}
      />
    </Box>
  );
});
