import React from 'react';
import lodash from 'lodash';
import { render, screen } from '@testing-library/react';
import { JalaliPickerControl, JalaliPickerControlProps } from './JalaliPickerControl';

const defaultProps: JalaliPickerControlProps = {};

function validateDataAttribute(prop: string) {
  const attr = `data-${lodash.kebabCase(prop)}`;
  it(`sets ${attr} prop when ${prop} prop is set`, () => {
    const { rerender } = render(<JalaliPickerControl {...defaultProps} />);
    expect(screen.getByRole('button')).not.toHaveAttribute(attr);

    rerender(<JalaliPickerControl {...defaultProps} {...{ [prop]: true }} />);
    expect(screen.getByRole('button')).toHaveAttribute(attr);

    rerender(<JalaliPickerControl {...defaultProps} {...{ [prop]: true }} disabled />);
    expect(screen.getByRole('button')).not.toHaveAttribute(attr);
  });
}

describe('@mantine-datepicker-jalali/JalaliPickerControl', () => {
  validateDataAttribute('inRange');
  validateDataAttribute('firstInRange');
  validateDataAttribute('lastInRange');

  it('sets correct attributes when disabled prop is set', () => {
    const { rerender } = render(<JalaliPickerControl {...defaultProps} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled');
    expect(screen.getByRole('button')).not.toHaveAttribute('data-disabled');

    rerender(<JalaliPickerControl {...defaultProps} disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveAttribute('data-disabled');
  });

  it('correctly handles selected attribute', () => {
    const { rerender } = render(<JalaliPickerControl {...defaultProps} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('data-selected');

    rerender(<JalaliPickerControl {...defaultProps} selected />);
    expect(screen.getByRole('button')).toHaveAttribute('data-selected');

    rerender(<JalaliPickerControl {...defaultProps} selected disabled />);
    expect(screen.getByRole('button')).not.toHaveAttribute('data-selected');
  });

  it('has correct default __staticSelector', () => {
    render(<JalaliPickerControl {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveClass('mantine-PickerControl-pickerControl');
  });

  it('supports custom __staticSelector', () => {
    render(<JalaliPickerControl {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByRole('button')).toHaveClass('mantine-Calendar-pickerControl');
  });

  it('supports styles api (styles)', () => {
    render(
      <JalaliPickerControl
        {...defaultProps}
        styles={{ pickerControl: { borderColor: '#999124' } }}
      />
    );

    expect(screen.getByRole('button')).toHaveStyle({ borderColor: '#999124' });
  });

  it('supports styles api (classNames)', () => {
    render(
      <JalaliPickerControl {...defaultProps} classNames={{ pickerControl: 'test-control' }} />
    );

    expect(screen.getByRole('button')).toHaveClass('test-control');
  });
});
