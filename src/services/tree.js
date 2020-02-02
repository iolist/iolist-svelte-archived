export function unflatten(arr) {
  let tree = [];
  let mappedArr = {};

  for(let i = 0; i < arr.length; i++) {
    let arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]['children'] = [];
  }

  for (let id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
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

