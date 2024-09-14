import React, { useState, useEffect } from "react";

export const useLocalStrorage = (
  key: string,
  defData: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, setState] = useState(() => {
    const localData = localStorage.getItem(key);
    return localData || defData;
  });
  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
};
