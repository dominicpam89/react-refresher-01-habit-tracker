import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
   const [val, setVal] = useState<T>(() => {
      try {
         const item = window.localStorage.getItem(key);
         return item ? (JSON.parse(item) as T) : initialValue;
      } catch (e) {
         return initialValue;
      }
   });
   useEffect(() => {
      const item = JSON.stringify(val);
      if (item) {
         window.localStorage.setItem(key, item);
      }
   }, [val, key]);
   return [val, setVal] as const;
};
