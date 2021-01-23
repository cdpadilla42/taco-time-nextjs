export const loadState = () => {
  try {
    if (window !== undefined) {
      const serializedState = localStorage.getItem('taco-time-state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    }
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    if (window !== undefined) {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('taco-time-state', serializedState);
    }
  } catch {
    console.error('Error writing to local storage');
  }
};
