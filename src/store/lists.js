import { writable } from 'svelte/store';
import {remote, createRemoteData} from '../services/remote';

export const lists = writable(createRemoteData());

export const fetch = () => {
  return remote('/api/lists', {}, lists);
};
