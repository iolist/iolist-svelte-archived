<script>
 import RouterLink from './RouterLink.svelte'
</script>

<div class="container-l">
  <div class="header-content">
    <RouterLink customClass="header-link"></RouterLink>
  </div>
</div>

<style lang="scss">
  @import 'src/styles/_variables.scss';

  .header-content {
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    height: 100%;
  }
  :global(.header-link) {
    color: $text-grey;
    text-decoration: none;
    display: block;
    &:hover  {
        color: $text-black;
      }
  }
</style>
