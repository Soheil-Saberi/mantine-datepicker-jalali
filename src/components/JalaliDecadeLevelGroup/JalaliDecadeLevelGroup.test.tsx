import React from 'react';
import { render, screen } from '@testing-library/react';
import { JalaliDecadeLevelGroup, JalaliDecadeLevelGroupProps } from './JalaliDecadeLevelGroup';
import {
  itSupportsYearsListProps,
  itSupportsHeaderProps,
  itSupportsOnControlClick,
  itHandlesControlsKeyboardEvents,
  itSupportsOnControlMouseEnter,
} from '../../tests';

const defaultProps: JalaliDecadeLevelGroupProps = {
  decade: new Date(2022, 3, 11),
  levelControlAriaLabel: () => 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@mantine-datepicker-jalali/JalaliDecadeLevelGroup', () => {
  itSupportsYearsListProps(JalaliDecadeLevelGroup, defaultProps);
  itSupportsHeaderProps(JalaliDecadeLevelGroup, defaultProps);
  itSupportsOnControlClick(JalaliDecadeLevelGroup, defaultProps);
  itSupportsOnControlMouseEnter(JalaliDecadeLevelGroup, defaultProps);
  itHandlesControlsKeyboardEvents(
    JalaliDecadeLevelGroup,
    'decade',
    '.mantine-YearsList-yearsList',
    defaultProps
  );

  it('renders correct number of columns based on numberOfColumns prop', () => {
    const { rerender } = render(<JalaliDecadeLevelGroup {...defaultProps} numberOfColumns={1} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(1);

    rerender(<JalaliDecadeLevelGroup {...defaultProps} numberOfColumns={2} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(2);

    rerender(<JalaliDecadeLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(3);
  });

  it('renders correct years group based on year prop', () => {
    render(<JalaliDecadeLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control').map((node) => node.textContent)).toStrictEqual(
      ['2020 – 2029', '2030 – 2039', '2040 – 2049']
    );
  });

  it('supports levelControlAriaLabel as string', () => {
    render(<JalaliDecadeLevelGroup {...defaultProps} levelControlAriaLabel="test-label" />);
    expect(screen.getByText('2020 – 2029')).toHaveAttribute('aria-label', 'test-label');
  });

  it('supports levelControlAriaLabel as function', () => {
    render(
      <JalaliDecadeLevelGroup
        {...defaultProps}
        levelControlAriaLabel={(date) => `${date.getMonth()}/${date.getFullYear()}`}
      />
    );
    expect(screen.getByText('2020 – 2029')).toHaveAttribute('aria-label', '3/2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<JalaliDecadeLevelGroup {...defaultProps} />);
    expect(container.firstChild).toHaveClass('mantine-DecadeLevelGroup-decadeLevelGroup');
    expect(container.querySelector('table button')).toHaveClass(
      'mantine-DecadeLevelGroup-pickerControl'
    );
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(
      <JalaliDecadeLevelGroup {...defaultProps} __staticSelector="Calendar" />
    );
    expect(container.firstChild).toHaveClass('mantine-Calendar-decadeLevelGroup');
    expect(container.querySelector('table button')).toHaveClass('mantine-Calendar-pickerControl');
  });

  it('supports styles api (styles)', () => {
    const { container } = render(
      <JalaliDecadeLevelGroup
        {...defaultProps}
        styles={{
          decadeLevelGroup: { borderColor: '#CCEE45' },
          pickerControl: { borderColor: '#443443' },
        }}
      />
    );

    expect(container.firstChild).toHaveStyle({ borderColor: '#CCEE45' });
    expect(container.querySelector('table button')).toHaveStyle({ borderColor: '#443443' });
  });

  it('supports styles api (classNames)', () => {
    const { container } = render(
      <JalaliDecadeLevelGroup
        {...defaultProps}
        classNames={{ decadeLevelGroup: 'test-group', pickerControl: 'test-control' }}
      />
    );

    expect(container.firstChild).toHaveClass('test-group');
    expect(container.querySelector('table button')).toHaveClass('test-control');
  });
});
