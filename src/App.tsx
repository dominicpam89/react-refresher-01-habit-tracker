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

   // useEffect: sync theme class to document
   useEffect(() => {
      document.documentElement.setAttribute('data-theme', state.theme);
   }, [state.theme]);

   return (
      <div className="app">
         <header>
            <h1>Habits</h1>
            <button onClick={() => dispatch({ type: 'TOGGLE' })}>
               {state.theme === 'light' ? '🌙' : '☀️'}
            </button>
         </header>

         <form
            onSubmit={(e) => {
               e.preventDefault();
               if (newName.trim()) {
                  addHabit({ name: newName, emoji: newEmoji });
                  setNewName('');
               }
            }}
         >
            <input
               name="emoji"
               value={newEmoji}
               onChange={(e) => setNewEmoji(e.target.value)}
               style={{ width: 48 }}
            />
            <input
               name="newName"
               value={newName}
               onChange={(e) => setNewName(e.target.value)}
               placeholder="New habit..."
            />
            <button type="submit">Add</button>
         </form>

         {habits.map((h) => (
            <HabitCard
               key={h.id}
               habit={h}
               onToggle={toggleToday}
               onDelete={removeHabit}
            />
         ))}
      </div>
   );
}
