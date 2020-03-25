export function isCaretPositionAtBegin() {
  return window.getSelection().getRangeAt(0).startOffset === 0 &&
        window.getSelection().getRangeAt(0).startOffset === window.getSelection().getRangeAt(0).endOffset;
}

// export function setCaretPositionToEnd(element) {
//   element.focus();
//   let sel;
//   if (document.selection) {
//     sel = document.selection.createRange();
//     sel.moveStart('character', position);
//     sel.select();
//   }
//   else {
//     sel = window.getSelection();
//     sel.collapse(element.lastChild, position);
//   }
// }
