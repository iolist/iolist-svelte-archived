export function unflatten(nodes) {
  let tree = [];
  let nodeMap = new Map();

  for(let i = 0; i < nodes.length; i++) {
    let arrElem = nodes[i];
    nodeMap.set(arrElem.id, {...arrElem, children: []});
  }

  for (let mappedElem of nodeMap.values()) {
    if (mappedElem.parent_id) {
      nodeMap.get(mappedElem.parent_id)['children'].push(mappedElem);
    } else {
      tree.push(mappedElem);
    }
  }
  return tree;
}

export function sortTree(tree) {
  let map = new Map();
  let lost = []; // elements with wrong or duplicated previous ID,
  tree.forEach((element) => {
    const prevId = element.previous_id;
    if (!map.has(prevId)) {
      map.set(prevId, element);
    } else {
      lost.push({...element, lost: true});
    }
  });
  const sortedArray = [];

  let lastId = null;
  let element;
  while (map.has(lastId)) {
    element = map.get(lastId);
    // if (element.children.length) {
    //   element.children = sortTreeWithChildren(element.children);
    // }
    sortedArray.push(element);
    map.delete(lastId); // pop previous
    lastId = element.id;
  }
  [...map.values(), ...lost].forEach(lostVal => sortedArray.push(lostVal)); // push lost values to an array
  return sortedArray;
}

export function getChildNodes(nodes, parentId = null) {
  const result = [];
  for (let node of nodes.values()) {
    if (node.parent_id === parentId) {
      result.push(node);
    }
  }
  return sortTree(result);
}
