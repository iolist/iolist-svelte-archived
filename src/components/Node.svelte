<script>
  import Dropdown from './Dropdown.svelte';
  import MenuItem from './menu/MenuItem.svelte'
  import ellipsis from '../icons/ellipsis-vertical.svg';

  export let node;
</script>

<div class="node">
  <div class="present">
    <div class="menu">
      <Dropdown closeOnClick={true}>
        <span slot="trigger" class="icon">{@html ellipsis}</span>
        <div slot="content">
          <MenuItem item={{callback: () => console.log('click'), text: 'Menu item 1'}}/>
          <MenuItem item={{callback: () => console.log('click'), text: 'Menu item 2'}}/>
          <MenuItem item={{callback: () => console.log('click'), text: 'Menu item 3'}} withDivider={true}/>
          <MenuItem item={{callback: () => console.log('click'), text: 'Menu item 4'}}/>
          <MenuItem item={{callback: () => console.log('click'), text: 'Menu item 5'}}/>
        </div>
      </Dropdown>
    </div>

    <div class="title">{node.title}</div>
  </div>

  <div class="children">
    {#each node.children as child}
      <svelte:self node={child}/>
    {/each}
  </div>
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
        .icon {
          opacity: 0.5;
        }
      }
    }
    .title {
      padding-top: 5px;
    }
  }
  .children {
    margin-left: 20px;
  }
  .icon {
    height: 24px;
    border-radius: 12px;
    padding: 4px;
    display: block;
    cursor: pointer;
    float: left;
    opacity: 0.05;
    transition: all 0.5s ease;
    &:hover {
      opacity: 1;
      background: $light-grey-bg;
    }
    :global(svg) {
      height: 100%;
   }
  }
</style>
