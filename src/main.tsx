import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ThemeContextProvider from './context/ThemeContextProvider.tsx';
import HabitContextProvider from './context/HabitContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <ThemeContextProvider>
         <HabitContextProvider>
            <App />
         </HabitContextProvider>
      </ThemeContextProvider>
   </StrictMode>
);
