/**
 * Represents a habit tracker entry.
 * @typedef {Object} Habit
 * @property {string} id - Unique identifier for the habit.
 * @property {string} name - Display name of the habit.
 * @property {string} emoji - Emoji icon representing the habit.
 * @property {string[]} completedDates - Array of ISO date strings (format: 'YYYY-MM-DD') indicating when the habit was completed.
 * @property {string} createdAt - ISO timestamp of when the habit was created.
 */
export type Habit = {
   id: string;
   name: string;
   emoji: string;
   completedDates: string[]; // ISO date strings: '2026-03-15'
   createdAt: string;
};

export type ThemeState = { theme: 'light' | 'dark' };
export type ThemeAction = { type: 'TOGGLE' };
