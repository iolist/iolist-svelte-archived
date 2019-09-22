import { writable } from 'svelte/store';

const initialState = {
  value: null,
  error: null,
  isFetching: true 
};

export const listsStore = writable(initialState, async (set) => {
  set({ value: null, error: null, isFetching: true });
  try {
    const response = await fetch('/api/lists');
    const data = await response.json();
    if (response.ok) {
      set({ value: data, error: null, isFetching: false });
    } else {
      set({ value: null, error: data, isFetching: false });
    }
  } catch (e) {
    set({ value: null, error: e, isFetching: false });
  }
});