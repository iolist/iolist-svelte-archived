export function unflatten(nodes) {
  let tree = [];
  let mappedArr = {};

  for(let i = 0; i < nodes.length; i++) {
    let arrElem = nodes[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]['children'] = [];
  }

  for (let id in mappedArr) {
    if (Object.prototype.hasOwnProperty.call(mappedArr, id)) {
      let mappedElem = mappedArr[id];
      if (mappedElem.parent_id) {
        mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
      }
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

export function sortTreeWithChildren(tree) {
  let map = new Map();
  tree.forEach((element) => map.set(element.previous_id, element));
  const sortedArray = [];

  let lastId = null;
  let element;
  while (map.has(lastId)) {
    element = map.get(lastId);
    if (element.children.length) {
      element.children = sortTreeWithChildren(element.children);
    }
    sortedArray.push(element);
    map.delete(lastId); // pop previous
    lastId = element.id;
  }
  // all elements with wrong previous_id which is left
  map.forEach(element => {
    if (element.children.length) {
      element.children = sortTreeWithChildren(element.children);
    }
    sortedArray.push(element);
  });
  return sortedArray;
}

// @todo: move sort to unflatten to reduce amount of work
