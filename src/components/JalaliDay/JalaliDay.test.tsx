import React from 'react';
import lodash from 'lodash';
import { render, screen } from '@testing-library/react';
import { JalaliDay, JalaliDayProps } from './JalaliDay';

const defaultProps: JalaliDayProps = {
  date: new Date(2022, 1, 3),
};

function validateDataAttribute(prop: string) {
  const attr = `data-${lodash.kebabCase(prop)}`;
  it(`sets ${attr} prop when ${prop} prop is set`, () => {
    const { rerender } = render(<JalaliDay {...defaultProps} />);
    expect(screen.getByRole('button')).not.toHaveAttribute(attr);

    rerender(<JalaliDay {...defaultProps} {...{ [prop]: true }} />);
    expect(screen.getByRole('button')).toHaveAttribute(attr);

    rerender(<JalaliDay {...defaultProps} {...{ [prop]: true }} disabled />);
    expect(screen.getByRole('button')).not.toHaveAttribute(attr);
  });
}

describe('@mantine-datepicker-jalali/JalaliDay', () => {
  validateDataAttribute('weekend');
  validateDataAttribute('outside');
  validateDataAttribute('selected');
  validateDataAttribute('inRange');
  validateDataAttribute('firstInRange');
  validateDataAttribute('lastInRange');

  it('renders given date value', () => {
    render(<JalaliDay {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent(defaultProps.date.getDate().toString());
  });

  it('supports radius prop', () => {
    render(<JalaliDay {...defaultProps} radius={45} />);
    expect(screen.getByRole('button')).toHaveStyle({ borderRadius: '45px' });
  });

  it('adds correct disabled attributes when disabled prop is set', () => {
    render(<JalaliDay {...defaultProps} disabled />);
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
    expect(screen.getByRole('button')).toHaveAttribute('data-disabled');
  });

  it('has correct default __staticSelector', () => {
    render(<JalaliDay {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveClass('mantine-Day-day');
  });

  it('supports __staticSelector', () => {
    render(<JalaliDay {...defaultProps} __staticSelector="Month" />);
    expect(screen.getByRole('button')).toHaveClass('mantine-Day-day', 'mantine-Month-day');
  });

  it('supports styles api (styles)', () => {
    render(<JalaliDay {...defaultProps} styles={{ day: { borderColor: '#CECECE' } }} />);
    expect(screen.getByRole('button')).toHaveStyle({ borderColor: '#CECECE' });
  });

  it('supports styles api (classNames)', () => {
    render(<JalaliDay {...defaultProps} classNames={{ day: 'test-day-class' }} />);
    expect(screen.getByRole('button')).toHaveClass('test-day-class');
  });

  it('allows to customize day rendering with renderDay function', () => {
    render(<JalaliDay {...defaultProps} renderDay={(date) => date.getFullYear()} />);
    expect(screen.getByRole('button')).toHaveTextContent('2022');
  });

  it('does not add data-weekend attribute when outside prop is true', () => {
    render(<JalaliDay {...defaultProps} weekend outside />);
    expect(screen.getByRole('button')).toHaveAttribute('data-outside');
    expect(screen.getByRole('button')).not.toHaveAttribute('data-weekend');
  });

  it('adds data-hidden attribute when hidden prop is set', () => {
    const { rerender, container } = render(<JalaliDay {...defaultProps} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('data-hidden');

    rerender(<JalaliDay {...defaultProps} hidden />);
    expect(container.querySelector('button')).toHaveAttribute('data-hidden');
    expect(container.querySelector('button')).toHaveStyle({ display: 'none' });
  });

  it('supports static prop', () => {
    const { container, rerender } = render(<JalaliDay {...defaultProps} />);
    expect((container.firstChild as HTMLElement).tagName).toBe('BUTTON');

    rerender(<JalaliDay {...defaultProps} static />);
    expect((container.firstChild as HTMLElement).tagName).toBe('DIV');
  });

  it('adds data-today attribute if date is the same as today', () => {
    const { rerender } = render(<JalaliDay {...defaultProps} date={new Date(2021, 11, 1)} />);
    expect(screen.getByRole('button')).not.toHaveAttribute('data-today');

    rerender(<JalaliDay {...defaultProps} date={new Date()} />);
    expect(screen.getByRole('button')).toHaveAttribute('data-today');
  });
});
