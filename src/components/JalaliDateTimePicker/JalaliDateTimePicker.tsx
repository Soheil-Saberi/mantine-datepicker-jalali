import dayjs from 'dayjs';
import React, { forwardRef, useState, useRef } from 'react';
import {
  useComponentDefaultProps,
  CheckIcon,
  ActionIcon,
  ActionIconProps,
  Selectors,
  DefaultProps,
} from '@mantine/core';
import { useDisclosure, useUncontrolled, useDidUpdate } from '@mantine/hooks';
import { assignTime } from '../../utils';
import { JalaliTimeInput, JalaliTimeInputProps } from '../JalaliTimeInput';
import { pickCalendarProps, CalendarBaseProps, CalendarSettings } from '../JalaliCalendar';
import { JalaliDatePicker } from '../JalaliDatePicker';
import {
  JalaliPickerInputBase,
  DateInputSharedProps,
  PickerInputBaseStylesNames,
} from '../JalaliPickerInputBase';
import { DateValue } from '../../types';
import { useDatesContext } from '../JalaliDatesProvider';
import useStyles from './JalaliDateTimePicker.styles';

export type DateTimePickerStylesNames = PickerInputBaseStylesNames | Selectors<typeof useStyles>;

export interface JalaliDateTimePickerProps
  extends DefaultProps<DateTimePickerStylesNames>,
    Omit<DateInputSharedProps, 'classNames' | 'styles' | 'closeOnChange'>,
    Omit<CalendarBaseProps, 'defaultDate'>,
    CalendarSettings {
  /** Dayjs format to display input value, "DD/MM/YYYY HH:mm" by default  */
  valueFormat?: string;

  /** Controlled component value */
  value?: DateValue;

  /** Default value for uncontrolled component */
  defaultValue?: DateValue;

  /** Called when value changes */
  onChange?(value: DateValue): void;

  /** JalaliTimeInput component props */
  JalalitimeInputProps?: JalaliTimeInputProps;

  /** Props added to submit button */
  submitButtonProps?: ActionIconProps & React.ComponentPropsWithoutRef<'button'>;

  /** Determines whether seconds input should be rendered */
  withSeconds?: boolean;
}

const defaultProps: Partial<JalaliDateTimePickerProps> = {};

export const JalaliDateTimePicker = forwardRef<HTMLButtonElement, JalaliDateTimePickerProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      onChange,
      valueFormat,
      locale,
      classNames,
      styles,
      unstyled,
      JalalitimeInputProps,
      submitButtonProps,
      withSeconds,
      level,
      defaultLevel,
      ...rest
    } = useComponentDefaultProps('DateTimePicker', defaultProps, props);

    const _valueFormat = valueFormat || (withSeconds ? 'DD/MM/YYYY HH:mm:ss' : 'DD/MM/YYYY HH:mm');

    const { classes, cx } = useStyles(null, {
      name: 'DateTimePicker',
      classNames,
      styles,
      unstyled,
    });

    const timeInputRef = useRef<HTMLInputElement>();

    const {
      calendarProps: { allowSingleDateInRange, ...calendarProps },
      others,
    } = pickCalendarProps(rest);

    const ctx = useDatesContext();
    const [_value, setValue] = useUncontrolled({
      value,
      defaultValue,
      finalValue: null,
      onChange,
    });

    const formatTime = (dateValue: Date) =>
      dateValue ? dayjs(dateValue).format(withSeconds ? 'HH:mm:ss' : 'HH:mm') : '';

    const [timeValue, setTimeValue] = useState(formatTime(_value));
    const [currentLevel, setCurrentLevel] = useState(level || defaultLevel || 'month');

    const [dropdownOpened, dropdownHandlers] = useDisclosure(false);
    const formattedValue = _value
      ? dayjs(_value).locale(ctx.getLocale(locale)).format(_valueFormat)
      : '';

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      JalalitimeInputProps?.onChange?.(event);
      const val = event.currentTarget.value;
      setTimeValue(val);

      if (val) {
        const [hours, minutes, seconds] = val.split(':').map(Number);
        const timeDate = new Date();
        timeDate.setHours(hours);
        timeDate.setMinutes(minutes);
        seconds !== undefined && timeDate.setSeconds(seconds);
        setValue(assignTime(timeDate, _value || new Date()));
      }
    };

    const handleDateChange = (date: Date) => {
      setValue(assignTime(_value, date));
      timeInputRef.current?.focus();
    };

    const handleTimeInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      JalalitimeInputProps?.onKeyDown?.(event);

      if (event.key === 'Enter') {
        event.preventDefault();
        dropdownHandlers.close();
      }
    };

    useDidUpdate(() => {
      if (!dropdownOpened) {
        setTimeValue(formatTime(_value));
      }
    }, [_value, dropdownOpened]);

    return (
      <JalaliPickerInputBase
        formattedValue={
          locale && locale === 'fa'
            ? new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long', timeStyle: 'short' }).format(
                _value
              )
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
        __staticSelector="DateTimePicker"
        ref={ref}
        onClear={() => setValue(null)}
        shouldClear={!!_value}
        value={_value}
        type="default"
        {...others}
      >
        <JalaliDatePicker
          {...calendarProps}
          type="default"
          value={_value}
          defaultDate={_value}
          onChange={handleDateChange}
          locale={locale}
          classNames={classNames}
          styles={styles}
          unstyled={unstyled}
          __staticSelector="DateTimePicker"
          level={level}
          defaultLevel={defaultLevel}
          onLevelChange={(_level) => {
            setCurrentLevel(_level);
            calendarProps.onLevelChange?.(_level);
          }}
        />

        {currentLevel === 'month' && (
          <div className={classes.timeWrapper}>
            <JalaliTimeInput
              value={timeValue}
              withSeconds={withSeconds}
              ref={timeInputRef}
              unstyled={unstyled}
              {...JalalitimeInputProps}
              className={cx(classes.timeInput, JalalitimeInputProps?.className)}
              onChange={handleTimeChange}
              onKeyDown={handleTimeInputKeyDown}
            />

            <ActionIcon<'button'>
              variant="default"
              size={36}
              onClick={(event) => {
                submitButtonProps?.onClick?.(event);
                dropdownHandlers.close();
              }}
              // eslint-disable-next-line react/no-children-prop
              children={<CheckIcon width={12} />}
              unstyled={unstyled}
              {...submitButtonProps}
            />
          </div>
        )}
      </JalaliPickerInputBase>
    );
  }
);

JalaliDateTimePicker.displayName = '@mantine-datepicker-jalali/JalaliDateTimePicker';
