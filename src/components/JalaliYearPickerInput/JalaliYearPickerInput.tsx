import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesInput } from '../../hooks';
import { pickCalendarProps } from '../JalaliCalendar';
import { JalaliYearPicker, YearPickerBaseProps } from '../JalaliYearPicker';
import { DatePickerType } from '../../types';
import {
  JalaliPickerInputBase,
  DateInputSharedProps,
  PickerInputBaseStylesNames,
} from '../JalaliPickerInputBase';

export type YearPickerInputStylesNames = PickerInputBaseStylesNames;

export interface JalaliYearPickerInputProps<Type extends DatePickerType = 'default'>
  extends DateInputSharedProps,
    YearPickerBaseProps<Type> {
  /** Dayjs format to display input value, "YYYY" by default  */
  valueFormat?: string;
}

type YearPickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: JalaliYearPickerInputProps<Type>
) => JSX.Element) & { displayName?: string };

const defaultProps: Partial<JalaliYearPickerInputProps> = {
  type: 'default',
  valueFormat: 'YYYY',
  closeOnChange: true,
};

export const JalaliYearPickerInput: YearPickerInputComponent = forwardRef((props, ref) => {
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
  } = useComponentDefaultProps('YearPickerInput', defaultProps, props);

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
      __staticSelector="YearPickerInput"
      ref={ref}
      onClear={onClear}
      shouldClear={shouldClear}
      value={_value}
      type={type}
      {...others}
    >
      <JalaliYearPicker
        {...calendarProps}
        type={type}
        value={_value}
        defaultDate={Array.isArray(_value) ? _value[0] || undefined : _value || undefined}
        onChange={setValue}
        locale={locale}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        __staticSelector="YearPickerInput"
      />
    </JalaliPickerInputBase>
  );
});

JalaliYearPickerInput.displayName = '@mantine-datepicker-jalali/JalaliYearPickerInput';
