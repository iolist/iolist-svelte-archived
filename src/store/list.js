import { writable } from 'svelte/store';
import {remote, createRemoteData} from '../services/remote';

export const list = writable(createRemoteData());

export const fetch = (id) => {
  return remote(`/api/list/${id}`, {}, list);
};

export const addNode = (neighbor, newTitle) => {
  console.log(newTitle);
  list.update(list => {
    list.value.nodes.some(element => {
      if (element.id === neighbor.id) {
        element.title = element.title.split(newTitle)[0];
        return true;
      }
    });
    list.value.nodes.push({
      list_id: neighbor.list_id,
      parent_id: neighbor.parent_id,
      title: newTitle,
      notes: null,
    });
    console.log(list);
    return list;
  });
  // window.fetch('/api/node/', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     list_id: neighbor.list_id,
  //     parent_id: neighbor.parent_id,
  //     title: ''
  //   })
  // });
  // return neighbor;
};
