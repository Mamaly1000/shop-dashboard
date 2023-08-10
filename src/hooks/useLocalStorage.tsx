import { useState, useEffect } from "react";
const useLocalStorage = <T,>(key: string, initValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const jsonVlaue = localStorage.getItem(key);
    if (jsonVlaue === null) {
      if (typeof initValue === "function") {
        return (initValue as () => T)();
      } else {
        return initValue;
      }
    } else {
      return JSON.parse(jsonVlaue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
};

export default useLocalStorage;
