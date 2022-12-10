import dayjs from 'dayjs';
import React from 'react';
import { JalaliMonthPickerInput } from './JalaliMonthPickerInput';

export default { title: 'JalaliMonthPickerInput' };

export function Usage() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliMonthPickerInput
        label="Month picker input"
        placeholder="Pick month"
        numberOfColumns={3}
        allowDeselect
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliMonthPickerInput label="Month picker input" placeholder="Pick month" disabled />
    </div>
  );
}

export function DropdownModal() {
  return (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <JalaliMonthPickerInput
        label="Month picker input"
        placeholder="Pick month"
        dropdownType="modal"
      />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPickerInput type="range" label="Month picker input" />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPickerInput type="multiple" label="Month picker input" />
    </div>
  );
}

export function SelectedDisabledMonth() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPickerInput
        label="Month picker input"
        defaultValue={new Date()}
        getMonthControlProps={(date) => ({ disabled: dayjs(date).isSame(new Date(), 'month') })}
      />
    </div>
  );
}

export function WithMaxDate() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPickerInput label="Month picker input" maxDate={new Date()} />
    </div>
  );
}

export function Clearable() {
  return (
    <div style={{ padding: 40 }}>
      <JalaliMonthPickerInput label="Default" clearable />
      <JalaliMonthPickerInput label="Multiple" type="multiple" clearable />
      <JalaliMonthPickerInput label="Range" type="range" clearable />
    </div>
  );
}
