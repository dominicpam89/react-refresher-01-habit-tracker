import type { Habit } from '../types';

export const useStreak = (completedDates: Habit['completedDates']) => {
   const sorted = completedDates.sort().reverse();
   const today = new Date().toISOString().split('T')[0];
   let streak = 0;
   let current = today;
   for (const date of sorted) {
      if (date === current) {
         streak++;
         const d = new Date(current);
         d.setDate(d.getDate() - 1);
         current = d.toISOString().split('T')[0];
      } else {
         break;
      }
   }
   const isTodayDone = completedDates.includes(today);
   return { streak, isTodayDone };
};
