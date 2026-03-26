import { useRef } from 'react';
import type { Habit } from '../types';
import { useStreak } from '../hooks/useStreak';

type Props = {
   habit: Habit;
   onToggle: (id: string) => void;
   onDelete: (id: string) => void;
};

export default function HabitCard({ habit, onToggle, onDelete }: Props) {
   const { streak, isTodayDone } = useStreak(habit.completedDates);
   const renderCount = useRef(0);
   renderCount.current++;

   const last7 = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split('T')[0];
   });

   return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-100 dark:border-gray-700">
         <HabitHeader habit={habit} streak={streak} />
         <div className="flex gap-1 mt-4">
            {last7.map((date) => (
               <div
                  key={date}
                  className={`
              w-8 h-8 rounded-full border transition-colors
              ${
                 habit.completedDates.includes(date)
                    ? 'bg-primary-500 border-primary-500 dark:bg-primary-400 dark:border-primary-400'
                    : 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
              }
            `}
                  title={date}
               />
            ))}
         </div>
         <HabitActions
            habit={habit}
            onToggle={onToggle}
            onDelete={onDelete}
            isTodayDone={isTodayDone}
         />
      </div>
   );
}

interface HabitHeaderProps {
   habit: Habit;
   streak: number;
}

function HabitHeader({ habit, streak }: HabitHeaderProps) {
   return (
      <div className="flex items-center gap-2">
         <span className="text-2xl">{habit.emoji}</span>
         <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {habit.name}
         </span>
         <span className="ml-auto text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 rounded-full px-2 py-0.5">
            🔥 {streak}
         </span>
      </div>
   );
}

interface HabitActionsProps {
   habit: Habit;
   onToggle: (id: string) => void;
   onDelete: (id: string) => void;
   isTodayDone: boolean;
}

function HabitActions({
   habit,
   onToggle,
   onDelete,
   isTodayDone,
}: HabitActionsProps) {
   const buttonRef = useRef<HTMLButtonElement>(null);

   return (
      <div className="flex justify-between items-center gap-3 mt-4">
         <button
            ref={buttonRef}
            onClick={() => onToggle(habit.id)}
            className={`
          flex-1 py-2 px-3 rounded-lg font-medium transition-colors
          ${
             isTodayDone
                ? 'bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
                : 'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700'
          }
        `}
         >
            {isTodayDone ? '✓ Done today' : 'Mark done'}
         </button>
         <button
            onClick={() => onDelete(habit.id)}
            className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
            aria-label="Delete habit"
         >
            ✕
         </button>
      </div>
   );
}
