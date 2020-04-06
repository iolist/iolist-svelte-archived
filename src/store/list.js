import {writable} from 'svelte/store';
import {requestEndpoint, createRemoteData} from '../services/remote';

function createList() {
  const {subscribe, set, update} = writable(createRemoteData());

  /**
   * Fetching whole list
   * @param {String|Number} id
   */
  async function fetchList(id) {
    set({value: null, error: null, isFetching: true});
    const result = await requestEndpoint(`/api/list/${id}`);
    if (result.error) {
      set({value: null, error: result.error, isFetching: false});
    } else {
      set({value: result.data, error: null, isFetching: false});
    }
  }

  /**
   * Adding new node (without id)
   * @param {Object} newData
   */
  async function addNode(newData) {
    const tempId = Date.now() + '_t';
    update(listN => {
      listN.value.nodes.push({...newData, temp_id: tempId});
      return listN;
    });
    const result = await requestEndpoint('/api/node', {method:'POST', body: JSON.stringify(newData)});
    if (!result.error) {
      update(listN => {
        listN.value.nodes.map(element => {
          if (element.temp_id === tempId) {
            element = {...element, ...result.data};
            console.log(element);
          }
          return element;
        });
        return listN;
      });
    }
  }

  /**
   * Update node by id
   * @param {String|Number} id
   * @param {Object} newData
   */
  async function updateNode(id, newData) {
    let nodeToUpdate = newData;
    update(listN => {
      listN.value.nodes.forEach(element => {
        if (element.id === id) {
          element = {...element, ...newData};
        }
      });
      return listN;
    });
    const result = await requestEndpoint(`/api/node/${id}`, {method:'PUT', body: JSON.stringify(nodeToUpdate)});
    console.log(result);
  }

  /**
   * Deleting node
   * @param {String|Number} id
   */
  async function deleteNode(id) {
    update(listN => {
      listN.value.nodes = listN.value.nodes.filter(element => element.id !== id);
      return listN;
    });
    const result = await requestEndpoint(`/api/node/${id}`, {method:'DELETE'});
    if (result.error) {
      // todo: inform user
    }
  }

  return {
    subscribe,
    fetch: fetchList,
    addNode: addNode,
    updateNode: updateNode,
    deleteNode: deleteNode
  };
}

export default createList();
