import {writable} from 'svelte/store';
import {requestEndpoint} from '../services/remote';

export const info = writable({});
export const nodes = writable(new Map());
export const status = writable({isFetching: true, error: null});

/**
 * Fetching whole list
 * @param {String|Number} id
 */
export async function fetchList(id) {
  status.set({error: null, isFetching: true});
  info.set({});
  const result = await requestEndpoint(`/api/list/${id}`);
  if (result.error) {
    status.set({error: result.error, isFetching: false});
  } else {
    status.set({error: null, isFetching: false});
    info.set(result.data.list);
    nodes.set(new Map(result.data.nodes.map(el => [el.id, el])));
  }
}

/**
 * Adding new node (without id)
 * Add new node with temp_id -> send request to server -> get the id and update the node
 * @param {Object} newData
 */
export async function addNode(newData) {
  const tempId = Date.now() + '_t';
  nodes.update(nodes => {
    nodes.set(tempId, {...newData, temp_id: tempId});
    return nodes;
  });
  const result = await requestEndpoint('/api/node', {method:'POST', body: JSON.stringify(newData)});
  if (!result.error) {
    nodes.update(nodes => {
      nodes.set(result.data.id, {...result.data});
      nodes.delete(tempId);
    });
  }
}

/**
 * Update node by id
 * @param {String|Number} id
 * @param {Object} newData
 */
export async function updateNode(id, newData) {
  nodes.update(nodes => {
    if (nodes.has(id)) {
      const element = nodes.get(id);
      nodes.set(id, {...element, ...newData});
      console.log('Updated:', element);
    }
    return nodes;
  });

  // const result = await requestEndpoint(`/api/node/${id}`, {method:'PUT', body: JSON.stringify(nodeToUpdate)});
  // console.log(result);
}

/**
 * Deleting node
 * @param {String|Number} id
 */
export async function deleteNode(id) {
  nodes.update(nodes => {
    nodes.delete(id);
    return nodes;
  });
  // const result = await requestEndpoint(`/api/node/${id}`, {method:'DELETE'});
  // if (result.error) {
  //   // todo: inform user
  // }
}

