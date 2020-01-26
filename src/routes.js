import Home from './views/Home.svelte';
import List from './views/List.svelte';
import NotFound from './views/NotFound.svelte';

export default {
  '/': Home,
  '/list/:id': List,
  '*': NotFound,
};
