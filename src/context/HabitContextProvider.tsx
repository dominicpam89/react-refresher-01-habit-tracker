import { createContext, useCallback, useMemo } from 'react';
import type { Habit } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface HabitContextType {
   habits: Habit[];
   addHabit: (habit: Habit) => void;
   updateHabit: (habit: Habit) => void;
   removeHabit: (id: string) => void;
   toggleToday: (id: string) => void;
}

export const HabitContext = createContext<HabitContextType | null>(null);

export default function HabitContextProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [habits, setHabits] = useLocalStorage<Habit[]>('habits', []);

   const addHabit = useCallback(
      (habit: Habit) => {
         setHabits((prev) => [...prev, habit]);
      },
      [setHabits]
   );

   const updateHabit = useCallback(
      (updatedHabit: Habit) => {
         setHabits((prev) => {
            const idx = prev.findIndex((h) => h.id === updatedHabit.id);
            if (idx < 0) return prev;
            const next = [...prev];
            next[idx] = updatedHabit;
            return next;
         });
      },
      [setHabits]
   );

   const removeHabit = useCallback(
      (id: string) => {
         setHabits((prev) => prev.filter((habit) => habit.id !== id));
      },
      [setHabits]
   );

   const toggleToday = useCallback(
      (id: string) => {
         const today = new Date().toISOString().split('T')[0];
         setHabits((prev) =>
            prev.map((h) =>
               h.id !== id
                  ? h
                  : {
                       ...h,
                       completedDates: h.completedDates.includes(today)
                          ? h.completedDates.filter((d) => d !== today)
                          : [...h.completedDates, today],
                    }
            )
         );
      },
      [setHabits]
   );

   const value = useMemo(
      () => ({ habits, addHabit, updateHabit, removeHabit, toggleToday }),
      [habits, addHabit, updateHabit, removeHabit, toggleToday]
   );

   return (
      <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
   );
}
