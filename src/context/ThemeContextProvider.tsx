import {
   createContext,
   useContext,
   useMemo,
   useReducer,
   type PropsWithChildren,
} from 'react';
import type {
   ThemeStateType,
   ThemeActionType,
   ThemeContextType,
} from '../types';

const themeStateInitialValue: ThemeStateType = {
   theme: 'light',
};

/**
 * Reducer function for managing theme state transitions.
 * @param state - The current theme state containing the active theme.
 * @param action - The action object specifying the theme change type and optional payload.
 * @returns A new theme state object with the updated theme value.
 *
 * @remarks
 * Handles four action types:
 * - 'LIGHT': Sets theme to light mode
 * - 'DARK': Sets theme to dark mode
 * - 'SYSTEM': Sets theme to the value provided in action.payload
 * - 'TOGGLE': Toggles between light and dark themes based on current state
 */
const reducer = (
   state: ThemeStateType,
   action: ThemeActionType
): ThemeStateType => {
   let newTheme: ThemeStateType['theme'] = 'light';
   switch (action.type) {
      case 'LIGHT':
         newTheme = 'light';
         break;
      case 'DARK':
         newTheme = 'dark';
         break;
      case 'SYSTEM':
         newTheme = action.payload;
         break;
      case 'TOGGLE':
         state.theme === 'dark' ? (newTheme = 'light') : (newTheme = 'dark');
         break;
   }
   return { theme: newTheme };
};

/**
 * Context for managing theme state and theme-related operations.
 * Provides theme configuration to descendant components via React's Context API.
 *
 * @type {React.Context<ThemeContextType | null>}
 */
export const ThemeContext = createContext<ThemeContextType | null>(null);

interface Props extends PropsWithChildren {}
/**
 * Provides the theme context to the component tree.
 *
 * @param props - The component props
 * @param props.children - The child components to wrap with the theme context provider
 * @returns The theme context provider component
 */
export default function ThemeContextProvider({ children }: Props) {
   const [state, dispatch] = useReducer(reducer, themeStateInitialValue);
   const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
   return (
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
   );
}

/**
 * Hook to access the theme context.
 * @returns {ThemeContextType} The theme context object containing theme state and utilities.
 * @throws {Error} When used outside of ThemeContextProvider component.
 * @example
 * ```tsx
 * const theme = useThemeContext();
 * ```
 */
export const useThemeContext = () => {
   const ctx = useContext(ThemeContext);
   if (!ctx) throw new Error('Context must be inside ThemeContextProvider');
   return ctx;
};
