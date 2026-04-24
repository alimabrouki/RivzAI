import { useState, useEffect } from "react";
import type { HomeworkCard } from "../types/Chat";

export const useLocalStorage = (key : string,initialValue: HomeworkCard[] | string) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  },[key,value]);

  return [value, setValue];
}