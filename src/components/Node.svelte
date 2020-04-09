<script>
  import {afterUpdate, beforeUpdate, onMount} from 'svelte';
  import {fly} from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  import Dropdown from './Dropdown.svelte';
  import MenuItem from './menu/MenuItem.svelte';
  import Loader from './Loader.svelte';
  import {nodes, info, status, addNode, updateNode, deleteNode} from '../store/list.js';
  import {getChildNodes} from '../utils/tree.js';
  import {isCaretPositionAt, setCaretPositionToEnd, setCaretPositionToBegin} from '../utils/text.js';

  import ellipsis from '../icons/ellipsis-vertical.svg';
  import ellipse from '../icons/ellipse.svg';
  import caret from '../icons/caret.svg';

  export let nodeId;

  let collapsed;

  let newNode = false;
  let nodeRef;

  $: node = $nodes.get(nodeId);
  $: children = getChildNodes($nodes, nodeId)

  function calculateSizeOfTextarea() {
    const textarea = nodeRef.firstChild.lastChild;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  /**
   * Selecting all textareas with class '.title' and get the link on the previous one
   */
  function getPreviousNode() {
    const listOfElements = document.getElementsByClassName('title');
    for (let i = 0; i < listOfElements.length; i++) {
      if (listOfElements[i] === nodeRef.firstChild.lastChild) {
        if (i !== 0) {
          return listOfElements[i-1]
        }
        return;
      }
    }
  }

  /**
   * Selecting all textareas with class '.title' and get the link on the next one
   */
  function getNextNode() {
    const listOfElements = document.getElementsByClassName('title');
    for (let i = 0; i < listOfElements.length; i++) {
      if (listOfElements[i] === nodeRef.firstChild.lastChild) {
        if (i !== listOfElements.length - 1) {
          return listOfElements[i+1]
        }
        return;
      }
    }
  }

  /**
   *
   */
  function onKeydown(e) {
    switch (e.keyCode) {
      case 37: // left arrow
      case 38: // up arrow
        if (isCaretPositionAt(e.target, 0)) {
          e.preventDefault();
          setCaretPositionToEnd(getPreviousNode());
        }
        break;

      case 39: // right arrow
      case 40: // down arrow
        if (isCaretPositionAt(e.target, node.title.length)) {
          e.preventDefault();
          setCaretPositionToBegin(getNextNode());
        }
        break;

      case 8: // backspace
        if (isCaretPositionAt(e.target, 0)) {
          e.preventDefault();
          if (node.previous_id) {
            const previousNode = $nodes.get(node.previous_id);
            deleteNode(node.id);
            if (previousNode) {
              updateNode(previousNode.id, {
                title: previousNode.title + node.title
              });
            }
            setCaretPositionToEnd(getPreviousNode());
          }
        }
        break;
      case 13: // enter
        e.preventDefault();
        if (!node.id) {
          return;
        }
        break;
    }


    // if (e.keyCode === 13) { // enter
    //   e.preventDefault();
    //   if (!node.id) {
    //     return;
    //   }
    //   // remove selection
    //   window.getSelection().deleteFromDocument()

    //   console.log(e.target.value);
    //   console.log(window.getSelection());
    //   // const inner = e.target.childNodes;
    //   // setTimeout(() => {
    //   //   newNode = {
    //   //     title: (inner.length > 1) ? inner[inner.length - 1].textContent : '',
    //   //     previous_id: node.id
    //   //   };
    //   //   const newTitle = inner[0].textContent;
    //   //   list.updateNode(node.id, {
    //   //     ...node,
    //   //     title: newTitle
    //   //   });
    //   // }, 30);
    // }
  }

  /**
   * Add an empty node after this node
   */
  function addEmptyNode() {
    addNode({
        list_id: node.list_id,
        parent_id: node.parent_id,
        title: '',
        previous_id: node.id
      });
  }

  function deleteThisNode() {
    deleteNode(node.id);
  }

  afterUpdate(() => {
    // if (newNode) {
    //   list.addNode({
    //     list_id: node.list_id,
    //     parent_id: node.parent_id,
    //     ...newNode
    //   });
    //   newNode = false;
    //   setTimeout(() => {
    //     nodeRef.nextElementSibling.children[0].children[1].focus();
    //   }, 30);
    // }
    calculateSizeOfTextarea();

  });

  onMount(() => {
    calculateSizeOfTextarea();
  });
</script>

<div class="node" bind:this={nodeRef}>
  <div class="present">
    <div class="menu">
        <div class="ellipsis">
          {#if node.id}
            <Dropdown closeOnClick={true}>
              <span slot="trigger" class="icon">{@html ellipsis}</span>
              <div slot="content">
                <MenuItem item={{callback: () => deleteThisNode(), text: 'Delete'}}/>
                <MenuItem item={{callback: () => addEmptyNode(), text: 'Add node'}}/>
              </div>
            </Dropdown>
          {:else}
            <span class="icon loading"><Loader adaptive={true} /></span>
          {/if}
        </div>

      <div class="point" on:click={()=> collapsed = !collapsed}>
        {#if children && children.length}
          <div class="caret" class:collapsed>
            {@html caret}
          </div>
        {:else}
          <div class="bullet">
            {@html ellipse}
          </div>
        {/if}
      </div>
    </div>

    <textarea class="title" rows="1" on:keydown={onKeydown} bind:value={node.title}></textarea>
  </div>

  {#if !collapsed}
    <div class="children" transition:fly="{{ x: -50, duration: 150 }}">
      {#each children as child}
        <svelte:self nodeId={child.id}/>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  @import 'src/styles/_variables.scss';

  .menu {
    position: relative;
    margin-right: 10px;
    float: left;
  }
  .node {
    margin-top: 10px;
    .present {
      display: flex;
      &:hover {
        .ellipsis {
          .icon {
            opacity: 0.3;
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }
    .title {
      display: block;
      min-height: 22px;
      outline: none;
      border: none;
      background: none;
      flex-grow: 1;
      resize: none;
      line-height: 22px;
      height: auto;
    }
  }
  .children {
    margin-left: 20px;
  }
  .menu {
    .ellipsis {
      float: left;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      .icon {
        height: 24px;
        padding: 4px;
        display: block;
        opacity: 0;
        &.loading {
          width: 24px;
          opacity: 0.4;
        }
      }
      &:hover {
        background: $hover-bg;
      }
    }
    .point {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      cursor: pointer;
      width: 24px;
      border-radius: 12px;
      &:hover {
        background: $hover-bg;
        .bullet, .caret {
          opacity: 0.6;
        }
      }
      .bullet, .caret {
        display: block;
        float: left;
        line-height: 0;
        opacity: 0.4;
        transition: all 0.2s ease;
      }
      .bullet {
        height: 8px;
      }
      .caret {
        height: 14px;
        transform: rotate(90deg);
        &.collapsed {
          transform: rotate(0deg);
        }
      }
    }

    :global(svg) {
        height: 100%;
      }
  }
</style>
