import {writable} from 'svelte/store';
import {remote, createRemoteData} from '../services/remote';

function createList() {
  const {subscribe, set, update} = writable(createRemoteData());

  return {
    subscribe,
    fetch: (id) => remote(`/api/list/${id}`, {}, {set}),
    addNode: async (newData) => {
      const tempId = Date.now();
      update(listN => {
        listN.value.nodes.push({temp_id: tempId, ...newData});
        return listN;
      });
      const response = await window.fetch('/api/node', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      const data = await response.json();
      update(listN => {
        listN.value.nodes = listN.value.nodes.map(node => {
          if (node.temp_id && node.temp_id === tempId) {
            node = {...node, ...data};
          }
          return node;
        });
        return listN;
      });
    },
    updateNode: async (element, newData) => {
      let nodeToUpdate = newData;
      update(listN => {
        listN.value.nodes = listN.value.nodes.map(node => {
          if (node.id === element.id) {
            node = {...node, ...newData};
            nodeToUpdate = node;
          }
          return node;
        });
        return listN;
      });
      const response = await window.fetch('/api/node', {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nodeToUpdate)
      });
      const data = await response.json();
      console.log(data);
    },
    deleteNode: (element) => {
      update(listN => {
        listN.value.nodes = listN.value.nodes.filter(node => {
          return !(node.id === element.id);
        });
        console.log(listN.value.nodes);
        return listN;
      });
    }
  };
}

export default createList();
