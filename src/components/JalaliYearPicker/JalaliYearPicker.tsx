import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesState } from '../../hooks';
import { DecadeLevelSettings } from '../JalaliDecadeLevel';
import { PickerBaseProps, DatePickerType } from '../../types';
import { JalaliCalendar, CalendarBaseProps, CalendarSystemProps } from '../JalaliCalendar';

export interface YearPickerBaseProps<Type extends DatePickerType = 'default'>
  extends PickerBaseProps<Type>,
    DecadeLevelSettings,
    CalendarBaseProps {}

export interface JalaliYearPickerProps<Type extends DatePickerType = 'default'>
  extends YearPickerBaseProps<Type>,
    CalendarSystemProps {}

const defaultProps: Partial<JalaliYearPickerProps> = {
  type: 'default',
};

type YearPickerComponent = (<Type extends DatePickerType = 'default'>(
  props: JalaliYearPickerProps<Type>
) => JSX.Element) & { displayName?: string };

export const JalaliYearPicker: YearPickerComponent = forwardRef(
  <Type extends DatePickerType = 'default'>(
    props: JalaliYearPickerProps<Type>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const {
      type,
      defaultValue,
      value,
      onChange,
      __staticSelector,
      getYearControlProps,
      allowSingleDateInRange,
      allowDeselect,
      onMouseLeave,
      onYearSelect,
      ...others
    } = useComponentDefaultProps('YearsPicker', defaultProps, props as any);

    const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps } =
      useDatesState<Type>({
        type,
        level: 'year',
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
        minLevel="decade"
        __updateDateOnYearSelect={false}
        __staticSelector={__staticSelector || 'YearPicker'}
        onMouseLeave={onRootMouseLeave}
        onYearMouseEnter={(_event, date) => onHoveredDateChange(date)}
        onYearSelect={(date) => {
          onDateChange(date);
          onYearSelect?.(date);
        }}
        getYearControlProps={(date) => ({
          ...getControlProps(date),
          ...getYearControlProps?.(date),
        })}
        {...others}
      />
    );
  }
);

JalaliYearPicker.displayName = '@mantine-datepicker-jalali/JalaliYearPicker';
