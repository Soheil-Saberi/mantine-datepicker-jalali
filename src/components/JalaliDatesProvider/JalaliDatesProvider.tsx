import React, { createContext } from 'react';
import { DayOfWeek } from '../../types';

export interface DatesProviderValue {
  locale: string;
  firstDayOfWeek: DayOfWeek;
  weekendDays: DayOfWeek[];
}

export type DatesProviderSettings = Partial<DatesProviderValue>;

export const DATES_PROVIDER_DEFAULT_SETTINGS: DatesProviderValue = {
  locale: 'en',
  firstDayOfWeek: 1,
  weekendDays: [0, 6],
};

export const DatesProviderContext = createContext(DATES_PROVIDER_DEFAULT_SETTINGS);

export interface JalaliDatesProviderProps {
  settings: DatesProviderSettings;
  children: React.ReactNode;
}

export function JalaliDatesProvider({ settings, children }: JalaliDatesProviderProps) {
  return (
    <DatesProviderContext.Provider value={{ ...DATES_PROVIDER_DEFAULT_SETTINGS, ...settings }}>
      {children}
    </DatesProviderContext.Provider>
  );
}
