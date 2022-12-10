import React from 'react';
import { DatesRangeValue, DateValue, DatePickerType } from '../../types';

export type HiddenDatesInputValue = DatesRangeValue | DateValue | DateValue[];

export interface JalaliHiddenDatesInputProps {
  value: HiddenDatesInputValue;
  type: DatePickerType;
  name: string;
  form: string;
}

function formatValue(value: HiddenDatesInputValue, type: DatePickerType) {
  if (type === 'range' && Array.isArray(value)) {
    const [startDate, endDate] = value;
    if (!startDate) {
      return '';
    }

    if (!endDate) {
      return `${startDate.toISOString()} –`;
    }

    return `${startDate.toISOString()} – ${endDate.toISOString()}`;
  }

  if (type === 'multiple' && Array.isArray(value)) {
    return value.map((date) => date.toISOString()).join(', ');
  }

  if (!Array.isArray(value) && value) {
    return value.toISOString();
  }

  return '';
}

export function JalaliHiddenDatesInput({ value, type, name, form }: JalaliHiddenDatesInputProps) {
  return <input type="hidden" value={formatValue(value, type)} name={name} form={form} />;
}

JalaliHiddenDatesInput.displayName = '@mantine-datepicker-jalali/JalaliHiddenDatesInput';
