import React, { forwardRef } from 'react';
import {
  useComponentDefaultProps,
  TextInput,
  TextInputProps,
  TextInputStylesNames,
} from '@mantine/core';
import useStyles from './JalaliTimeInput.styles';

export type TimeInputStylesNames = TextInputStylesNames;

export interface JalaliTimeInputProps extends TextInputProps {
  /** Determines whether seconds input should be rendered */
  withSeconds?: boolean;
}

const defaultProps: Partial<JalaliTimeInputProps> = {};

export const JalaliTimeInput = forwardRef<HTMLInputElement, JalaliTimeInputProps>((props, ref) => {
  const { classNames, withSeconds, ...others } = useComponentDefaultProps(
    'TimeInput',
    defaultProps,
    props
  );
  const { classes, cx } = useStyles();
  return (
    <TextInput
      type="time"
      step={withSeconds ? 1 : 60}
      classNames={{ input: cx(classes.input, classNames?.input) }}
      ref={ref}
      {...others}
    />
  );
});

JalaliTimeInput.displayName = '@mantine-datepicker-jalali/JalaliTimeInput';
