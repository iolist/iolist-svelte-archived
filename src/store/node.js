import {derived} from 'svelte/store';
import list from './list.js';

function createNode(id) {
  const node = derived(list, $list => {
    if ($list.value) {
      return $list.value.nodes.find(el => el.id === id);
    }
    return {};
  });
  return {
    set: (newValue) => {
      list.updateNode(id, newValue);
    },
    ...node
  };
}

export default createNode;
