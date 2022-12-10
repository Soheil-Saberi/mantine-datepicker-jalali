import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesState } from '../../hooks';
import { DecadeLevelSettings } from '../JalaliDecadeLevel';
import { YearLevelSettings } from '../JalaliYearLevel';
import { PickerBaseProps, DatePickerType } from '../../types';
import { JalaliCalendar, CalendarBaseProps, CalendarSystemProps } from '../JalaliCalendar';

export interface MonthPickerBaseProps<Type extends DatePickerType = 'default'>
  extends PickerBaseProps<Type>,
    DecadeLevelSettings,
    YearLevelSettings,
    CalendarBaseProps {}

export interface JalaliMonthPickerProps<Type extends DatePickerType = 'default'>
  extends MonthPickerBaseProps<Type>,
    CalendarSystemProps {}

const defaultProps: Partial<JalaliMonthPickerProps> = {
  type: 'default',
};

type MonthPickerComponent = (<Type extends DatePickerType = 'default'>(
  props: JalaliMonthPickerProps<Type>
) => JSX.Element) & { displayName?: string };

export const JalaliMonthPicker: MonthPickerComponent = forwardRef(
  <Type extends DatePickerType = 'default'>(
    props: JalaliMonthPickerProps<Type>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const {
      type,
      defaultValue,
      value,
      onChange,
      __staticSelector,
      getMonthControlProps,
      allowSingleDateInRange,
      allowDeselect,
      onMouseLeave,
      onMonthSelect,
      ...others
    } = useComponentDefaultProps('MonthPicker', defaultProps, props as any);

    const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } =
      useDatesState<Type>({
        type,
        level: 'month',
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
        minLevel="year"
        __updateDateOnMonthSelect={false}
        __staticSelector={__staticSelector || 'MonthPicker'}
        onMouseLeave={onRootMouseLeave}
        onMonthMouseEnter={(_event, date) => onHoveredDateChange(date)}
        onMonthSelect={(date) => {
          onDateChange(date);
          onMonthSelect?.(date);
        }}
        getMonthControlProps={(date) => ({
          ...getControlProps(date),
          ...getMonthControlProps?.(date),
        })}
        {...others}
      />
    );
  }
);

JalaliMonthPicker.displayName = '@mantine-datepicker-jalali/JalaliMonthPicker';
