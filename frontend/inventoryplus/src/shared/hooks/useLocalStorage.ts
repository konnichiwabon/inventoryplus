import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return initialValue;
      
      if (typeof initialValue === 'number') {
        return Number(item) as unknown as T;
      }
      if (typeof initialValue === 'boolean') {
        return (item === 'true') as unknown as T;
      }
      return item as unknown as T;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, String(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
