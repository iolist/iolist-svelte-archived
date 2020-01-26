<script>
import Router from 'svelte-spa-router'
import RouterLink from './components/RouterLink.svelte';
import routes from './routes';

</script>

<RouterLink page={{path: '/', name: 'Home'}} />
<RouterLink page={{path: '/list/1', name: 'List'}} />
<div id="pageContent">
  <Router {routes}/>
</div>
