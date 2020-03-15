<script>
  import {afterUpdate} from 'svelte';
  import { fly } from 'svelte/transition';

  import Dropdown from './Dropdown.svelte';
  import MenuItem from './menu/MenuItem.svelte'
  import {addNode} from '../store/list.js';

  import ellipsis from '../icons/ellipsis-vertical.svg';
  import ellipse from '../icons/ellipse.svg';
  import caret from '../icons/caret.svg';

  export let node;

  let collapsed;

  // function addNode() {

  // }

  function onKeydown(e) {
    // if (e.keyCode === 13) { // enter
      const inner = e.target.childNodes;
      console.log(e);
      setTimeout(() => {
        console.log(inner[0]);
        // addNode(node, lastChild);
        // console.log(e.target.lastChild.textContent, node.title.split(e.target.lastChild.textContent)[0]);
        // node.title = node.title.split(e.target.lastChild.textContent)[0];
        // console.log(node.title);
      })

    // }
  }

  afterUpdate(() => {
		// console.log(node)
  });
</script>

<div class="node">
  <div class="present">
    <div class="menu">
      <div class="ellipsis">
        <Dropdown closeOnClick={true}>
          <span slot="trigger" class="icon">{@html ellipsis}</span>
          <div slot="content">
            <MenuItem item={{callback: () => console.log('click'), text: 'Delete'}}/>
            <MenuItem item={{callback: () => console.log('click'), text: 'Add node'}}/>
          </div>
        </Dropdown>
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

    <span class="title" contenteditable={true} on:keydown={onKeydown}>{node.title}</span>
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
      display: inline-block;
      padding-top: 5px;
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
