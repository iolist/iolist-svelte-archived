<script>
  import {onMount} from 'svelte';
  import {link} from 'svelte-spa-router'
  import {fetch as fetchList, list} from '../store/list.js';

  export let params = {}

  onMount(() => fetchList(params.id));
</script>

<style>
	h1 {
		color: red;
	}
</style>

<h1>This is List page {params.id}</h1>
