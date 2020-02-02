<script>
  import Router from 'svelte-spa-router'
  import RouterLink from './components/RouterLink.svelte';
  import Header from './components/Header.svelte';
  import routes from './routes';
</script>

<Header></Header>
<div class="container-l">
  <div class="page">
    <Router {routes}/>
  </div>
</div>

<style global lang="scss" src="./styles/app.scss"></style>
