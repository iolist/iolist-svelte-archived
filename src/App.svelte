<script>
import router, { curRoute } from './router.js';
import RouterLink from './components/RouterLink.svelte';
import { onMount } from 'svelte';

onMount(() => {
  curRoute.set(window.location.pathname);
  if (!history.state) {
    window.history.replaceState({path: window.location.pathname}, '',   window.location.href)
  }
});

function handlerBackNavigation(event) {
  curRoute.set(event.state.path)
}
</script>

<style>
</style>

<svelte:window on:popstate={handlerBackNavigation} />

<RouterLink page={{path: '/', name: 'Home'}} />
<RouterLink page={{path: '/list', name: 'List'}} />

<div id="pageContent">
  <!-- Page component updates here -->
  <svelte:component this={router[$curRoute]} />
</div>
