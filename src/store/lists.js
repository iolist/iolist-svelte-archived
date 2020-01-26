import { writable } from 'svelte/store';

export const lists = writable({
  value: null,
  error: null,
  isFetching: true
});

export const fetch = async () => {
  try {
    const response = await window.fetch('/api/lists');
    const data = await response.json();
    if (response.ok) {
      lists.set({ value: data, error: null, isFetching: false });
    } else {
      lists.set({ value: null, error: data, isFetching: false });
    }
  } catch (e) {
    lists.set({ value: null, error: e, isFetching: false });
  }
};
