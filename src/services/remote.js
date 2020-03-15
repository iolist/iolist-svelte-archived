export async function remote(endpoint, options, store) {
  try {
    const response = await window.fetch(endpoint, options);
    const data = await response.json();
    if (response.ok) {
      store.set({ value: data, error: null, isFetching: false });
    } else {
      store.set({ value: null, error: {data, response}, isFetching: false });
    }
  } catch (e) {
    store.set({ value: null, error: {data: e}, isFetching: false });
  }
}

export function createRemoteData() {
  return {
    value: null,
    error: null,
    isFetching: true
  };
}
