import React, { forwardRef } from 'react';
import { useComponentDefaultProps } from '@mantine/core';
import { useDatesInput } from '../../hooks';
import { pickCalendarProps } from '../JalaliCalendar';
import { JalaliDatePicker, DatePickerBaseProps } from '../JalaliDatePicker';
import { DatePickerType } from '../../types';
import {
  JalaliPickerInputBase,
  DateInputSharedProps,
  PickerInputBaseStylesNames,
} from '../JalaliPickerInputBase';

export type DatePickerInputStylesNames = PickerInputBaseStylesNames;

export interface JalaliDatePickerInputProps<Type extends DatePickerType = 'default'>
  extends DateInputSharedProps,
    DatePickerBaseProps<Type> {
  /** Dayjs format to display input value, "MMMM D, YYYY" by default  */
  valueFormat?: string;
}

type DatePickerInputComponent = (<Type extends DatePickerType = 'default'>(
  props: JalaliDatePickerInputProps<Type>
) => JSX.Element) & { displayName?: string };

const defaultProps: Partial<JalaliDatePickerInputProps> = {
  type: 'default',
  valueFormat: 'MMMM D, YYYY',
  closeOnChange: true,
};

export const JalaliDatePickerInput: DatePickerInputComponent = forwardRef((props, ref) => {
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
  } = useComponentDefaultProps('DatePickerInput', defaultProps, props);

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
      formattedValue={
        locale && locale === 'fa'
          ? new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long' }).format(_value)
          : formattedValue
      }
      style={{
        direction: locale && locale === 'fa' ? 'rtl' : 'ltr',
        textAlignLast: locale && locale === 'fa' ? 'right' : 'auto',
      }}
      dropdownOpened={dropdownOpened}
      dropdownHandlers={dropdownHandlers}
      classNames={classNames}
      styles={styles}
      unstyled={unstyled}
      __staticSelector="DatePickerInput"
      ref={ref}
      onClear={onClear}
      shouldClear={shouldClear}
      value={_value}
      type={type}
      {...others}
    >
      <JalaliDatePicker
        {...calendarProps}
        type={type}
        value={_value}
        defaultDate={Array.isArray(_value) ? _value[0] || undefined : _value || undefined}
        onChange={setValue}
        locale={locale}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        __staticSelector="DatePickerInput"
      />
    </JalaliPickerInputBase>
  );
});

JalaliDatePickerInput.displayName = '@mantine-datepicker-jalali/JalaliDatePickerInput';
