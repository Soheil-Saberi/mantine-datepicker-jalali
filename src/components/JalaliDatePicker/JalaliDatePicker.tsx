import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesState } from '../../hooks';
import { PickerBaseProps, DatePickerType } from '../../types';
import {
  JalaliCalendar,
  CalendarBaseProps,
  CalendarSystemProps,
  CalendarSettings,
} from '../JalaliCalendar';

export interface DatePickerBaseProps<Type extends DatePickerType = 'default'>
  extends PickerBaseProps<Type>,
    CalendarSettings,
    CalendarBaseProps {}

export interface JalaliDatePickerProps<Type extends DatePickerType = 'default'>
  extends DatePickerBaseProps<Type>,
    CalendarSystemProps {}

const defaultProps: Partial<JalaliDatePickerProps> = {
  type: 'default',
  numberOfColumns: 1,
};

type DatePickerComponent = (<Type extends DatePickerType = 'default'>(
  props: JalaliDatePickerProps<Type>
) => JSX.Element) & { displayName?: string };

export const JalaliDatePicker: DatePickerComponent = forwardRef(
  <Type extends DatePickerType = 'default'>(
    props: JalaliDatePickerProps<Type>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const {
      type,
      defaultValue,
      value,
      onChange,
      __staticSelector,
      getDayProps,
      allowSingleDateInRange,
      allowDeselect,
      onMouseLeave,
      onMonthSelect,
      numberOfColumns,
      ...others
    } = useComponentDefaultProps('DatePicker', defaultProps, props as any);

    const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } =
      useDatesState<Type>({
        type,
        level: 'day',
        allowDeselect,
        allowSingleDateInRange,
        value,
        defaultValue,
        onChange,
        onMouseLeave,
      });

    return (
      <JalaliCalendar
        ref={ref}
        minLevel="month"
        __updateDateOnMonthSelect={false}
        __staticSelector={__staticSelector || 'DatePicker'}
        onMouseLeave={onRootMouseLeave}
        hideOutsideDates={numberOfColumns !== 1}
        numberOfColumns={numberOfColumns}
        __onDayMouseEnter={(_event, date) => onHoveredDateChange(date)}
        __onDayClick={(_event, date) => onDateChange(date)}
        getDayProps={(date) => ({
          ...getControlProps(date),
          ...getDayProps?.(date),
        })}
        {...others}
      />
    );
  }
);

JalaliDatePicker.displayName = '@mantine-datepicker-jalali/JalaliDatePicker';
