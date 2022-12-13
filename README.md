
# Mantine DatePicker Jalali

Jalali DatePicker & Calendar of mantine library.

In this library, [Mantine](https://github.com/mantinedev/mantine) & [Mantine-dates-v6](https://github.com/rtivital/dates-6.0) are used, and all their features are available.

Using all the features of this library requires the installation of two libraries: [@mantine/core](https://www.npmjs.com/package/@mantine/core),[@mantine/hooks](https://www.npmjs.com/package/@mantine/hooks)


## Installation

Install mantine-datepicker-jalali with npm

```bash
  npm i mantine-datepicker-jalali @mantine/core @mantine/hooks
```
    
## Examples

#### DateInput:

```javascript
import { DateValue, DateInput } from "mantine-datepicker-jalali";
import "dayjs/locale/fa"

function Demo() {
    const [singleValue, setSingleValue] = useState<DateValue>(null);
    return(
        <div>
            <DateInput        
            label="تاریخ"
            placeholder="تاریخ را وارد کنید"
            style={{ direction: "rtl" }} // RTL lable
            defaultValue={new Date()} // Initial date that is displayed, used for uncontrolled component
            value={singleValue}
            onChange={setSingleValue}
            locale="fa" // Required to use Jalali Calendar
            firstDayOfWeek={6} // number 0-6, 0 – Sunday, 6 – Saturday, defaults to 1 – Monday
            weekendDays={[5]} // Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday, defaults to value defined in DatesProvider
            />
        </div>
    );
}


```

#### DatePicker(multiple):

```javascript
import { DateValue, DatePicker } from "mantine-datepicker-jalali";
import "dayjs/locale/fa"

function Demo() {
    const [multipleDates, setMultipleDates] = useState<Date[]>([]);
    return(
        <div>
            <DatePicker
            type="multiple" // Picker type: range, multiple or default 
            value={multipleDates}
            onChange={setMultipleDates}
            locale="fa"
            firstDayOfWeek={6} 
            weekendDays={[5]} 
            />
        </div>
    );
}


```

#### DatePicker(range):

```javascript
import { DatesRangeValue, DateValue, DatePicker } from "mantine-datepicker-jalali";
import "dayjs/locale/fa"

function Demo() {
    const [rangeValue, setRangeValue] = useState<DatesRangeValue>([null, null]);
    return(
        <div>
            <DatePicker
            type="range" // Picker type: range, multiple or default 
            value={rangeValue}
            onChange={setRangeValue}
            locale="fa"
            firstDayOfWeek={6} 
            weekendDays={[5]} 
            />
        </div>
    );
}


```

#### DateTimePicker:

```javascript
import { DateTimePicker } from "mantine-datepicker-jalali";
import "dayjs/locale/fa"

function Demo() {
    const [singleValue, setSingleValue] = useState<DateValue>(null);
    return(
        <div>
            <DateTimePicker        
            label="تاریخ و زمان"
            placeholder="تاریخ و زمان را وارد کنید"
            style={{ direction: "rtl" }} // RTL lable
            defaultValue={new Date()} // Initial date that is displayed, used for uncontrolled component
            value={singleValue}
            onChange={setSingleValue}
            locale="fa" // Required to use Jalali Calendar
            firstDayOfWeek={6} // number 0-6, 0 – Sunday, 6 – Saturday, defaults to 1 – Monday
            weekendDays={[5]} // Indices of weekend days, 0-6, where 0 is Sunday and 6 is Saturday, defaults to value defined in DatesProvider
            clearable // Determines whether input value can be cleared, adds clear button to right section, false by default
            />
        </div>
    );
}


```


## Features

- [YearPicker Component](https://rtivital.github.io/mantine-dates-6/year-picker)
- [MonthPicker Component](https://rtivital.github.io/mantine-dates-6/month-picker)
- [YearPickerInput Component](https://rtivital.github.io/mantine-dates-6/year-picker-input)
- [MonthPickerInput Component](https://rtivital.github.io/mantine-dates-6/month-picker-input)
- [TimeInput Component](https://rtivital.github.io/mantine-dates-6/time-input)

## Support

For support, email saberi.soheil74@gmail.com


## License

[MIT](https://github.com/Soheil-Saberi/mantine-datepicker-jalali/blob/main/LICENSE)

