<script>
  import {afterUpdate, onDestroy} from 'svelte';
  // import { current_component } from 'svelte/internal';
  import {fly} from 'svelte/transition';

  import Dropdown from './Dropdown.svelte';
  import MenuItem from './menu/MenuItem.svelte';
  import Loader from './Loader.svelte';
  import list from '../store/list.js';

  import ellipsis from '../icons/ellipsis-vertical.svg';
  import ellipse from '../icons/ellipse.svg';
  import caret from '../icons/caret.svg';

  export let node;

  let collapsed;

  let newNode = false;
  let nodeRef;

  // this should be rewritten to events (help wanted)
  function onKeydown(e) {
    if (e.keyCode === 13) {
      if (!node.id) {
        e.preventDefault();
        return;
      }
      const inner = e.target.childNodes;
      setTimeout(() => {
        newNode =  {title: inner[inner.length - 1].textContent};
        const newTitle = inner[0].textContent;
        list.updateNode(node, {
          ...node,
          title: newTitle
        });
      }, 30);
    }
  }

  function addNode() {
    list.addNode({
        list_id: node.list_id,
        parent_id: node.parent_id,
        title: ''
      });
  }

  function deleteNode() {
    list.deleteNode({
      id: node.id
    });
  }

  afterUpdate(() => {
    if (newNode) {
      list.addNode({
        list_id: node.list_id,
        parent_id: node.parent_id,
        ...newNode
      });
      newNode = false;
      setTimeout(() => {
        nodeRef.nextElementSibling.children[0].children[1].focus();
      }, 30);
    }
  });

  onDestroy(() => {
		console.log('Destroy initiated');
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
                <MenuItem item={{callback: () => deleteNode(), text: 'Delete'}}/>
                <MenuItem item={{callback: () => addNode(), text: 'Add node'}}/>
              </div>
            </Dropdown>
          {:else}
            <span class="icon loading"><Loader adaptive={true} /></span>
          {/if}
        </div>

      <div class="point" on:click={()=> collapsed = !collapsed}>
        {#if node.children && node.children.length}
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

    <span class="title" contenteditable={true} tabindex="-1" on:keydown={onKeydown}>{@html node.title}</span>
  </div>
  {#if !collapsed}
    <div class="children" transition:fly="{{ x: -50, duration: 150 }}">
      {#each node.children as child}
        <svelte:self node={child}/>
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
      padding-top: 5px;
      min-height: 21px;
      outline: none;
      margin-left: 58px;
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
