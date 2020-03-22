import { writable } from 'svelte/store';
import {remote, createRemoteData} from '../services/remote';

export const list = writable(createRemoteData());

export const fetch = (id) => {
  return remote(`/api/list/${id}`, {}, list);
};

export const addNode = (neighbor, newTitle) => {
  list.update(listN => {
    console.log(listN);
    listN.value.nodes.push({
      list_id: neighbor.list_id,
      parent_id: neighbor.parent_id,
      title: newTitle,
      notes: null,
    });
    return listN;
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

export const updateNode = (element, newData) => {
  list.update(listN => {
    console.log(listN);
    listN.value.nodes = listN.value.nodes.map(node => {
      if (node.id === element.id) {
        node = {...node, ...newData};
      }
      return node;
    });
    return listN;
  });
};
