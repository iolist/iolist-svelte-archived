<script>
import {link} from 'svelte-spa-router'
import active from 'svelte-spa-router/active'
export let page = {
  path: '/', name: 'Home'
}
</script>

<a href={page.path} use:link  use:active={page.active || page.path}>
  {page.name}
</a>

<style>
/* Style for "active" links; need to mark this :global because the router adds the class directly */
:global(a.active) {
    color: blue;
}
</style>
