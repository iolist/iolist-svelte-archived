import { writable } from 'svelte/store';
import {remote, createRemoteData} from '../services/remote';

function createList() {
  const { subscribe, set, update } = writable(createRemoteData());

  return {
    subscribe,
    fetch: (id) => remote(`/api/list/${id}`, {}, {set}),
    addNode: (newData) => {
      update(listN => {
        listN.value.nodes.push(newData);
        return listN;
      });
    },
    updateNode: (element, newData) => {
      update(listN => {
        listN.value.nodes = listN.value.nodes.map(node => {
          if (node.id === element.id) {
            node = {...node, ...newData};
          }
          return node;
        });
        return listN;
      });
    }
  };
}

export default createList();
