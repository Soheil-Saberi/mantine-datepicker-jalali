import dayjs from 'dayjs';
import React, { useState } from 'react';
import 'dayjs/locale/fa';
import { JalaliDatePickerInput } from './JalaliDatePickerInput';

export default { title: 'JalaliDatePickerInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliDatePickerInput
        label="Date picker input"
        placeholder="Pick date"
        numberOfColumns={3}
        allowDeselect
      />
    </div>
  );
}

export function ReadOnly() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliDatePickerInput label="Default read only" placeholder="Pick date" readOnly />
      <JalaliDatePickerInput
        mt="md"
        label="Read only with value"
        placeholder="Pick date"
        defaultValue={new Date(2022, 3, 11)}
        clearable
        readOnly
      />
      <JalaliDatePickerInput
        mt="md"
        label="Read only with modal"
        placeholder="Pick date"
        dropdownType="modal"
        readOnly
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliDatePickerInput label="Date picker input" placeholder="Pick date" disabled />
    </div>
  );
}

export function DropdownModal() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliDatePickerInput
        label="Date picker input"
        placeholder="Pick date"
        dropdownType="modal"
      />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePickerInput type="range" label="Date picker input" />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePickerInput type="multiple" label="Date picker input" />
    </div>
  );
}

export function SelectedDisabledDate() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePickerInput
        label="Date picker input"
        defaultValue={new Date()}
        getDayProps={(date) => ({ disabled: dayjs(date).isSame(new Date(), 'day') })}
      />
    </div>
  );
}

export function WithMaxDate() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePickerInput label="Date picker input" maxDate={new Date()} />
    </div>
  );
}

export function Clearable() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliDatePickerInput label="Default" clearable />
      <JalaliDatePickerInput label="Multiple" type="multiple" clearable />
      <JalaliDatePickerInput label="Range" type="range" clearable />
    </div>
  );
}
export function JalaliJalaliDatePickerInput() {
  const [value, setValue] = useState<Date>(new Date());
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliDatePickerInput
        value={value}
        onChange={setValue}
        label="تاریخ خود را انتخاب کنید"
        placeholder="ثبت تاریخ"
        numberOfColumns={3}
        allowDeselect
        locale="fa"
        firstDayOfWeek={6}
        weekendDays={[5]}
      />
    </div>
  );
}
