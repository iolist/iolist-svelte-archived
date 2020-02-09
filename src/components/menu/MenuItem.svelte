<script>

  export let withDivider;
  export let item;
  export let width;

</script>

<div class="menu-item" style="width: {width}px" class:divider={withDivider}>
  <a href={item.href} on:click={item.callback}>{item.text}</a>
</div>

<style lang="scss">
  @import 'src/styles/_variables.scss';

  .menu-item {
    position: relative;
    min-width: 130px;
    &.divider {
      border-bottom: 1px solid $border-light;
    }
    a {
      padding:  10px 15px;
      display: block;
      cursor: pointer;
    }
  }
</style>
