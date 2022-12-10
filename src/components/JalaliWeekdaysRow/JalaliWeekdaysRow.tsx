import React, { forwardRef } from 'react';
import { DefaultProps, Selectors, useComponentDefaultProps, Box } from '@mantine/core';
import type { DayOfWeek } from '../../types';
import { useDatesContext } from '../JalaliDatesProvider';
import { getWeekdayNames } from './get-weekdays-names/get-weekdays-names';
import useStyles from './JalaliWeekdaysRow.styles';

export type WeekdaysRowStylesNames = Selectors<typeof useStyles>;

export interface JalaliWeekdaysRowProps
  extends DefaultProps<WeekdaysRowStylesNames>,
    React.ComponentPropsWithoutRef<'tr'> {
  __staticSelector?: string;

  /** dayjs locale, defaults to value defined in DatesProvider */
  locale?: string;

  /** number 0-6, 0 – Sunday, 6 – Saturday, defaults to 1 – Monday */
  firstDayOfWeek?: DayOfWeek;

  /** dayjs format to get weekday name, defaults to "dd" */
  weekdayFormat?: string;

  /** Choose cell type that will be used to render weekdays, defaults to th */
  cellComponent?: 'td' | 'th';
}

const defaultProps: Partial<JalaliWeekdaysRowProps> = {
  weekdayFormat: 'dd',
  cellComponent: 'th',
};

export const JalaliWeekdaysRow = forwardRef<HTMLTableRowElement, JalaliWeekdaysRowProps>(
  (props, ref) => {
    const {
      className,
      locale,
      firstDayOfWeek,
      weekdayFormat,
      cellComponent: CellComponent,
      __staticSelector,
      classNames,
      styles,
      unstyled,
      ...others
    } = useComponentDefaultProps('WeekdaysRow', defaultProps, props);

    const ctx = useDatesContext();

    const { classes, cx } = useStyles(null, {
      classNames,
      styles,
      unstyled,
      name: ['WeekdaysRow', __staticSelector],
    });

    const weekdays = getWeekdayNames({
      locale: ctx.getLocale(locale),
      format: weekdayFormat,
      firstDayOfWeek: ctx.getFirstDayOfWeek(firstDayOfWeek),
    }).map((weekday, index) => (
      <CellComponent key={index} className={classes.weekday}>
        {weekday}
      </CellComponent>
    ));

    return (
      <Box component="tr" ref={ref} className={cx(classes.weekdaysRow, className)} {...others}>
        {weekdays}
      </Box>
    );
  }
);

JalaliWeekdaysRow.displayName = '@mantine-datepicker-jalali/JalaliWeekdaysRow';
