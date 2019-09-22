<script>
import Router from './router.js';
export let page = {
  path: '/', name: 'Home'
}
function redirectTo(event) {
    // push the path into web browser history API
    Router.navigate(event.target.pathname);
}
</script>

<a href={page.path} on:click|preventDefault={redirectTo}>{page.name}</a>
