<script>
import {link} from 'svelte-spa-router'
import active from 'svelte-spa-router/active'

export let page = {
  path: '/', name: 'Home'
}
export let customClass;
</script>

<a href={page.path} use:link  class={customClass} use:active={page.active || page.path}>
  {page.name}
</a>

<style lang="scss">
  @import 'src/styles/_variables.scss';

/* Style for "active" links; need to mark this :global because the router adds the class directly */
  :global(a.active) {
    color: $text-black;
    &:hover  {
      color: $text-grey;
    }
  }
</style>
