<script>
  import Node from './Node.svelte';
  export let node;
</script>

<div class="node">
  {node.title}
  <div class="children">
    {#each node.children as child}
      <Node node={child}/>
    {/each}
  </div>
</div>

<style lang="scss">
  @import 'src/styles/_variables.scss';

  .children {
    margin-left: 20px;
  }
</style>
