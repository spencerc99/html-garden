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

  React.useLayoutEffect(() => {
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
