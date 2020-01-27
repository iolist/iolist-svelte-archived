import { writable } from 'svelte/store';
import {remote, createRemoteData} from '../services/remote';

export const list = writable(createRemoteData());

export const fetch = (id) => {
  return remote(`/api/list/${id}`, list);
};
