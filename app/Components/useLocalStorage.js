import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    setValue(storedValue ? JSON.parse(storedValue) : initialValue);
  }, [key, initialValue]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}