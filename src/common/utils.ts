import React from "react";

export function getLocalStorageItem<T>(key: string): T | null {
  const item = window.localStorage.getItem(key);

  if (!item) {
    return null;
  }

  return JSON.parse(item) as T;
}

// https://dev.to/joshwcomeau/comment/m114
export function useStickyState<T>(
  localStorageId: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    const stickyValue = getLocalStorageItem<T>(localStorageId);
    if (stickyValue !== null) {
      setValue(stickyValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorageId]);

  React.useEffect(() => {
    // It is absolutely insane that I have to do this. What the fuck nextJS? I have found no other way to make this work and this exact same code in another repo works perfectly well.
    setTimeout(() => {
      localStorage.setItem(localStorageId, JSON.stringify(value));
    }, 1);
  }, [localStorageId, value]);

  return [value, setValue];
}

// create new array that is a shuffled version of the
// input array
export function shuffleArray<T = any>(arr: T[], randGen?: () => number): T[] {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor((randGen ? randGen() : Math.random()) * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function isDevelopment(): boolean {
  return window.location.href.includes("localhost");
}

export function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
