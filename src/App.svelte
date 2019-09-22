<script>
import Router from './components/router.js';
import RouterLink from './components/RouterLink.svelte';
import { onMount } from 'svelte';

import Home from './views/Home.svelte';
import List from './views/List.svelte';
import NotFound from './views/NotFound.svelte';

let current = {
  component: Home,
  arguments: {}
};
// Router.config({ mode: 'history'});

Router
.add(/list\/(.*)/, function() {
    console.log(arguments[0]);
    current.component = List;
    current.arguments = {
      id: arguments[0]
    }
})
.add(/\//, function() {
    current.component = Home;
})
.add(function() {
    console.log('404');
    current.component = NotFound;
}).listen();

onMount(() => {
  Router.check();
});

</script>

<style>
</style>

<RouterLink page={{path: '/', name: 'Home'}} />
<RouterLink page={{path: '/list/1', name: 'List'}} />

<div id="pageContent">
  <svelte:component this={current.component} {...current.arguments} />
</div>
