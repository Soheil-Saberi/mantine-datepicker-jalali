import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesInput } from '../../hooks';
import { pickCalendarProps } from '../JalaliCalendar';
import { JalaliMonthPicker, MonthPickerBaseProps } from '../JalaliMonthPicker';
import { DatePickerType } from '../../types';
import {
  JalaliPickerInputBase,
  DateInputSharedProps,
  PickerInputBaseStylesNames,
} from '../JalaliPickerInputBase';

export type MonthPickerInputStylesNames = PickerInputBaseStylesNames;

export interface JalaliMonthPickerInputProps<Type extends DatePickerType = 'default'>
  extends DateInputSharedProps,
    MonthPickerBaseProps<Type> {
  /** Dayjs format to display input value, "MMMM YYYY" by default  */
  valueFormat?: string;
}

type MonthPickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: JalaliMonthPickerInputProps<Type>
) => JSX.Element) & { displayName?: string };

const defaultProps: Partial<JalaliMonthPickerInputProps> = {
  type: 'default',
  valueFormat: 'MMMM YYYY',
  closeOnChange: true,
};

export const JalaliMonthPickerInput: MonthPickerInputComponent = forwardRef((props, ref) => {
  const {
    type,
    value,
    defaultValue,
    onChange,
    valueFormat,
    locale,
    classNames,
    styles,
    unstyled,
    closeOnChange,
    ...rest
  } = useComponentDefaultProps('MonthPickerInput', defaultProps, props);

  const { calendarProps, others } = pickCalendarProps(rest);

  const {
    _value,
    setValue,
    formattedValue,
    dropdownHandlers,
    dropdownOpened,
    onClear,
    shouldClear,
  } = useDatesInput({
    type,
    value,
    defaultValue,
    onChange,
    locale,
    format: valueFormat,
    closeOnChange,
  });

  return (
    <JalaliPickerInputBase
      formattedValue={formattedValue}
      dropdownOpened={dropdownOpened}
      dropdownHandlers={dropdownHandlers}
      classNames={classNames}
      styles={styles}
      unstyled={unstyled}
      __staticSelector="MonthPickerInput"
      ref={ref}
      onClear={onClear}
      shouldClear={shouldClear}
      value={_value}
      type={type}
      {...others}
    >
      <JalaliMonthPicker
        {...calendarProps}
        type={type}
        value={_value}
        defaultDate={Array.isArray(_value) ? _value[0] || undefined : _value || undefined}
        onChange={setValue}
        locale={locale}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        __staticSelector="MonthPickerInput"
      />
    </JalaliPickerInputBase>
  );
});

JalaliMonthPickerInput.displayName = '@mantine-datepicker-jalali/JalaliMonthPickerInput';
