import {derived} from 'svelte/store';
import list from './list.js';

function createNode(id) {
  const node = derived(list, $list => $list.value.nodes.find(el => el.id === id));
  return {
    set: (newValue) => {
      list.updateNode(id, newValue);
    },
    ...node
  };
}

export default createNode;
