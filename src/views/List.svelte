<script>
  import {onMount} from 'svelte';
  import {link} from 'svelte-spa-router'
  import Loader from '../components/Loader.svelte';
  import Error from '../components/Error.svelte';
  import {fetch as fetchList, list} from '../store/list.js';

  export let params = {}

  onMount(() => fetchList(params.id));
</script>

<style>
	h1 {
		color: red;
	}
</style>

{#if $list.error}
	<Error error={$list.error}/>
{:else if $list.isFetching}
	<Loader/>
{:else}
  <h1>This is List page {params.id}</h1>
	{$list.value}
{/if}
