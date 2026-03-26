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
      <div className="">
         <HabitHeader habit={habit} streak={streak} />
         <div className="week-dots">
            {last7.map((date) => (
               <div
                  key={date}
                  className={`dot ${habit.completedDates.includes(date) ? 'filled' : ''}`}
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
      <div className="habit-header">
         <span className="habit-emoji">{habit.emoji}</span>
         <span className="habit-name">{habit.name}</span>
         <span className="streak">🔥 {streak}</span>
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
      <div className="habit-actions">
         <button
            ref={buttonRef}
            onClick={() => onToggle(habit.id)}
            className={`toggle-btn ${isTodayDone ? 'done' : ''}`}
         >
            {isTodayDone ? '✓ Done today' : 'Mark done'}
         </button>
         <button onClick={() => onDelete(habit.id)} className="delete-btn">
            ✕
         </button>
      </div>
   );
}
