export type Habit = {
   id: string;
   name: string;
   emoji: string;
   completedDates: string[]; // ISO date strings: '2026-03-15'
   createdAt: string;
};

export type ThemeState = { theme: 'light' | 'dark' };
export type ThemeAction = { type: 'TOGGLE' };
