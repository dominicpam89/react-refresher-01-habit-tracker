import { useState, useEffect, useContext } from 'react';
import { useThemeContext } from './context/ThemeContextProvider';
import {
   HabitContext,
   type HabitContextType,
} from './context/HabitContextProvider';
import HabitCard from './comps/HabitCard';

export default function App() {
   const { addHabit, habits, removeHabit, toggleToday } =
      useContext<HabitContextType>(HabitContext);
   const { state, dispatch } = useThemeContext();
   const [newName, setNewName] = useState('');
   const [newEmoji, setNewEmoji] = useState('⭐');

   // Sync theme class to document.documentElement (use 'dark' class for Tailwind)
   useEffect(() => {
      if (state.theme === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   }, [state.theme]);

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
         <div className="max-w-2xl mx-auto">
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  🌟 Habits
               </h1>
               <button
                  onClick={() => dispatch({ type: 'TOGGLE' })}
                  className="cursor-pointer p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  aria-label="Toggle theme"
               >
                  {state.theme === 'light' ? '🌙' : '☀️'}
               </button>
            </header>

            {/* Add Habit Form */}
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  if (newName.trim()) {
                     addHabit({ name: newName, emoji: newEmoji });
                     setNewName('');
                  }
               }}
               className="flex gap-2 mb-8"
            >
               <input
                  name="emoji"
                  value={newEmoji}
                  onChange={(e) => setNewEmoji(e.target.value)}
                  className="w-16 text-center text-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  maxLength={2}
               />
               <input
                  name="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="New habit..."
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-700 dark:text-gray-200"
               />
               <button
                  type="submit"
                  className="cursor-pointer px-5 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium shadow-sm"
               >
                  Add
               </button>
            </form>

            {/* Habit List */}
            <div className="space-y-4">
               {habits.map((h) => (
                  <HabitCard
                     key={h.id}
                     habit={h}
                     onToggle={toggleToday}
                     onDelete={removeHabit}
                  />
               ))}
               {habits.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
                     ✨ No habits yet. Add one above!
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
