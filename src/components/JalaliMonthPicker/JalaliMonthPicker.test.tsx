import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  itSupportsMonthsListProps,
  itHandlesControlsKeyboardEvents,
  itSupportsYearsListProps,
} from '../../tests';
import { JalaliMonthPicker } from './JalaliMonthPicker';

const defaultProps = {};

describe('@mantine-datepicker-jalali/JalaliMonthPicker', () => {
  itSupportsYearsListProps(JalaliMonthPicker, { ...defaultProps, defaultLevel: 'decade' });
  itSupportsMonthsListProps(JalaliMonthPicker, defaultProps);
  itHandlesControlsKeyboardEvents(
    JalaliMonthPicker,
    'decade',
    '.mantine-MonthPicker-monthsList',
    defaultProps
  );

  it('can be uncontrolled (type="default")', async () => {
    const { container } = render(
      <JalaliMonthPicker {...defaultProps} date={new Date(2022, 3, 11)} />
    );
    expect(container.querySelector('[data-selected]')).toBe(null);
    await userEvent.click(container.querySelector('table button'));
    expect(container.querySelector('[data-selected]').textContent).toBe('Jan');
  });

  it('can be controlled (type="default")', async () => {
    const spy = jest.fn();
    const { container } = render(
      <JalaliMonthPicker
        {...defaultProps}
        date={new Date(2022, 3, 11)}
        value={new Date(2022, 3, 11)}
        onChange={spy}
      />
    );

    expect(container.querySelector('[data-selected]').textContent).toBe('Apr');

    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalledWith(new Date(2022, 0, 1));
  });

  it('can be uncontrolled (type="multiple")', async () => {
    const { container } = render(
      <JalaliMonthPicker {...defaultProps} type="multiple" date={new Date(2022, 3, 11)} />
    );
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(0);
    await userEvent.click(container.querySelectorAll('table button')[0]);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(1);
    expect(container.querySelector('[data-selected]').textContent).toBe('Jan');

    await userEvent.click(container.querySelectorAll('table button')[1]);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(2);
    expect(
      Array.from(container.querySelectorAll('[data-selected]')).map((node) => node.textContent)
    ).toStrictEqual(['Jan', 'Feb']);
  });

  it('can be controlled (type="multiple")', async () => {
    const spy = jest.fn();
    const { container } = render(
      <JalaliMonthPicker
        {...defaultProps}
        type="multiple"
        date={new Date(2022, 3, 11)}
        value={[new Date(2022, 3, 11)]}
        onChange={spy}
      />
    );

    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalledWith([new Date(2022, 3, 11), new Date(2022, 0, 1)]);
  });

  it('can be uncontrolled (type="range")', async () => {
    const { container } = render(<JalaliMonthPicker {...defaultProps} type="range" />);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(0);

    await userEvent.click(container.querySelectorAll('table button')[5]);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-selected]')[0].textContent).toBe('Jun');

    await userEvent.click(container.querySelectorAll('table button')[9]);
    expect(container.querySelectorAll('[data-selected]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-selected]')[0].textContent).toBe('Jun');
    expect(container.querySelectorAll('[data-selected]')[1].textContent).toBe('Oct');
    expect(container.querySelectorAll('[data-in-range]')).toHaveLength(3);
  });

  it('can be controlled (type="range")', async () => {
    const spy = jest.fn();
    const { container } = render(
      <JalaliMonthPicker {...defaultProps} type="range" value={[null, null]} onChange={spy} />
    );
    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenLastCalledWith([new Date(2022, 0, 1), null]);
  });

  it('supports onClick handler from getMonthControlProps', async () => {
    const spy = jest.fn();
    const { container } = render(
      <JalaliMonthPicker {...defaultProps} getMonthControlProps={() => ({ onClick: spy })} />
    );
    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalled();
  });

  it('supports allowDeselect', async () => {
    const spy = jest.fn();
    const { container, rerender } = render(<JalaliMonthPicker {...defaultProps} onChange={spy} />);

    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalledWith(new Date(2022, 0, 1));
    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalledWith(new Date(2022, 0, 1));

    rerender(<JalaliMonthPicker {...defaultProps} onChange={spy} allowDeselect />);
    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalledWith(null);
    await userEvent.click(container.querySelector('table button'));
    expect(spy).toHaveBeenCalledWith(new Date(2022, 0, 1));
  });

  it('handles allowSingleDateInRange={true} correctly', async () => {
    const spy = jest.fn();
    const { container } = render(
      <JalaliMonthPicker {...defaultProps} type="range" allowSingleDateInRange onChange={spy} />
    );
    await userEvent.click(container.querySelectorAll('table button')[2]);
    expect(spy).toHaveBeenCalledWith([new Date(2022, 2, 1), null]);
    await userEvent.click(container.querySelectorAll('table button')[2]);
    expect(spy).toHaveBeenCalledWith([new Date(2022, 2, 1), new Date(2022, 2, 1)]);
  });

  it('handles allowSingleDateInRange={false} correctly', async () => {
    const spy = jest.fn();
    const { container } = render(
      <JalaliMonthPicker
        {...defaultProps}
        type="range"
        allowSingleDateInRange={false}
        onChange={spy}
      />
    );
    await userEvent.click(container.querySelectorAll('table button')[2]);
    expect(spy).toHaveBeenCalledWith([new Date(2022, 2, 1), null]);
    await userEvent.click(container.querySelectorAll('table button')[2]);
    expect(spy).toHaveBeenCalledWith([null, null]);
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<JalaliMonthPicker {...defaultProps} />);
    expect(container.firstChild).toHaveClass('mantine-MonthPicker-calendar');
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(
      <JalaliMonthPicker {...defaultProps} __staticSelector="Calendar" />
    );
    expect(container.firstChild).toHaveClass('mantine-Calendar-calendar');
  });
});
