import dayjs from 'dayjs';
import React, { forwardRef } from 'react';
import { Box, DefaultProps, useComponentDefaultProps, Selectors } from '@mantine/core';
import {
  JalaliCalendarHeader,
  CalendarHeaderStylesNames,
  CalendarHeaderSettings,
} from '../JalaliCalendarHeader';
import { useDatesContext } from '../JalaliDatesProvider';
import { YearsListSettings, YearsListStylesNames, JalaliYearsList } from '../JalaliYearsList';
import { getDecadeRange } from './get-decade-range/get-decade-range';
import useStyles from './JalaliDecadeLevel.styles';

export type DecadeLevelStylesNames =
  | Selectors<typeof useStyles>
  | YearsListStylesNames
  | CalendarHeaderStylesNames;

export interface DecadeLevelSettings extends YearsListSettings, CalendarHeaderSettings {
  /** dayjs label format to display decade label or a function that returns decade label based on date value, defaults to "YYYY" */
  decadeLabelFormat?: string | ((startOfDecade: Date, endOfDecade: Date) => React.ReactNode);
  locale?: string;
}

export interface JalaliDecadeLevelProps
  extends DefaultProps<DecadeLevelStylesNames>,
    DecadeLevelSettings,
    React.ComponentPropsWithoutRef<'div'> {
  __staticSelector?: string;

  /** Decade that is currently displayed */
  decade: Date;

  /** aria-label for change level control */
  levelControlAriaLabel?: string;
}

const defaultProps: Partial<JalaliDecadeLevelProps> = {
  decadeLabelFormat: 'YYYY',
};

export const JalaliDecadeLevel = forwardRef<HTMLDivElement, JalaliDecadeLevelProps>(
  (props, ref) => {
    const {
      // YearsList settings
      decade,
      locale,
      minDate,
      maxDate,
      yearsListFormat,
      getYearControlProps,
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
      decadeLabelFormat,
      classNames,
      styles,
      unstyled,
      __staticSelector,
      ...others
    } = useComponentDefaultProps('DecadeLevel', defaultProps, props);

    const { classes, cx } = useStyles(null, {
      name: ['DecadeLevel', __staticSelector],
      classNames,
      styles,
      unstyled,
    });

    const ctx = useDatesContext();
    const [startOfDecade, endOfDecade] = getDecadeRange(decade);

    const stylesApiProps = {
      classNames,
      styles,
      unstyled,
      __staticSelector: __staticSelector || 'DecadeLevel',
    };

    const _nextDisabled =
      typeof nextDisabled === 'boolean'
        ? nextDisabled
        : maxDate
        ? !dayjs(endOfDecade).endOf('year').isBefore(maxDate)
        : false;

    const _previousDisabled =
      typeof previousDisabled === 'boolean'
        ? previousDisabled
        : minDate
        ? !dayjs(startOfDecade).startOf('year').isAfter(minDate)
        : false;

    const formatDecade = (date: Date, format: string) =>
      dayjs(date)
        .locale(locale || ctx.locale)
        .format(format);

    return (
      <Box className={cx(classes.decadeLevel, className)} ref={ref} {...others}>
        <JalaliCalendarHeader
          label={
            locale && locale === 'fa'
              ? `${new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(
                  startOfDecade
                )} - ${new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(endOfDecade)}`
              : typeof decadeLabelFormat === 'function'
              ? decadeLabelFormat(startOfDecade, endOfDecade)
              : `${formatDecade(startOfDecade, decadeLabelFormat)} – ${formatDecade(
                  endOfDecade,
                  decadeLabelFormat
                )}`
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

        <JalaliYearsList
          decade={decade}
          locale={locale}
          minDate={minDate}
          maxDate={maxDate}
          yearsListFormat={yearsListFormat}
          getYearControlProps={getYearControlProps}
          __getControlRef={__getControlRef}
          __onControlKeyDown={__onControlKeyDown}
          __onControlClick={__onControlClick}
          __onControlMouseEnter={__onControlMouseEnter}
          __preventFocus={__preventFocus}
          {...stylesApiProps}
        />
      </Box>
    );
  }
);
