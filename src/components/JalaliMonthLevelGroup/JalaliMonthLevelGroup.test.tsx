import React from 'react';
import { render, screen } from '@testing-library/react';
import { JalaliMonthLevelGroup, JalaliMonthLevelGroupProps } from './JalaliMonthLevelGroup';
import {
  itSupportsMonthProps,
  itSupportsHeaderProps,
  itSupportsOnDayClick,
  itHandlesMonthKeyboardEvents,
} from '../../tests';

const defaultProps: JalaliMonthLevelGroupProps = {
  month: new Date(2022, 3, 11),
  levelControlAriaLabel: () => 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@mantine-datepicker-jalali/JalaliMonthLevelGroup', () => {
  itSupportsMonthProps(JalaliMonthLevelGroup, defaultProps);
  itSupportsHeaderProps(JalaliMonthLevelGroup, defaultProps);
  itSupportsOnDayClick(JalaliMonthLevelGroup, defaultProps);
  itHandlesMonthKeyboardEvents(JalaliMonthLevelGroup, defaultProps);

  it('renders correct number of months based on numberOfColumns prop', () => {
    const { rerender } = render(<JalaliMonthLevelGroup {...defaultProps} numberOfColumns={1} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(1);

    rerender(<JalaliMonthLevelGroup {...defaultProps} numberOfColumns={2} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(2);

    rerender(<JalaliMonthLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(3);
  });

  it('renders correct months group based on month prop', () => {
    render(<JalaliMonthLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control').map((node) => node.textContent)).toStrictEqual(
      ['April 2022', 'May 2022', 'June 2022']
    );
  });

  it('supports levelControlAriaLabel as string', () => {
    render(<JalaliMonthLevelGroup {...defaultProps} levelControlAriaLabel="test-label" />);
    expect(screen.getByText('April 2022')).toHaveAttribute('aria-label', 'test-label');
  });

  it('supports levelControlAriaLabel as function', () => {
    render(
      <JalaliMonthLevelGroup
        {...defaultProps}
        levelControlAriaLabel={(date) => `${date.getMonth()}/${date.getFullYear()}`}
      />
    );
    expect(screen.getByText('April 2022')).toHaveAttribute('aria-label', '3/2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<JalaliMonthLevelGroup {...defaultProps} />);
    expect(container.firstChild).toHaveClass('mantine-MonthLevelGroup-monthLevelGroup');
    expect(container.querySelector('table button')).toHaveClass('mantine-MonthLevelGroup-day');
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(
      <JalaliMonthLevelGroup {...defaultProps} __staticSelector="Calendar" />
    );
    expect(container.firstChild).toHaveClass('mantine-Calendar-monthLevelGroup');
    expect(container.querySelector('table button')).toHaveClass('mantine-Calendar-day');
  });

  it('supports styles api (styles)', () => {
    const { container } = render(
      <JalaliMonthLevelGroup
        {...defaultProps}
        styles={{
          monthLevelGroup: { borderColor: '#CCEE45' },
          day: { borderColor: '#443443' },
        }}
      />
    );

    expect(container.firstChild).toHaveStyle({ borderColor: '#CCEE45' });
    expect(container.querySelector('table button')).toHaveStyle({ borderColor: '#443443' });
  });

  it('supports styles api (classNames)', () => {
    const { container } = render(
      <JalaliMonthLevelGroup
        {...defaultProps}
        classNames={{ monthLevelGroup: 'test-group', day: 'test-day' }}
      />
    );

    expect(container.firstChild).toHaveClass('test-group');
    expect(container.querySelector('table button')).toHaveClass('test-day');
  });
});
