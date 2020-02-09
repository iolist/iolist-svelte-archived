<script>
  import {onMount} from 'svelte';
  import {link} from 'svelte-spa-router'

  import Loader from '../components/Loader.svelte';
  import Error from '../components/Error.svelte';
  import Node from '../components/Node.svelte';

  import {unflatten} from '../services/tree.js'
  import {fetch as fetchList, list} from '../store/list.js';

  export let params = {}

  let nodes = 0;

  $: if ($list.value && $list.value.nodes) {
		nodes = unflatten($list.value.nodes);
  }



  onMount(() => fetchList(params.id));
</script>

<style>
	h1 {
    margin-bottom: 10px;
    font-size: 20px;
	}
</style>

{#if $list.error}
	<Error error={$list.error}/>
{:else if $list.isFetching}
	<Loader/>
{:else}
  <h1>{$list.value.list.name}</h1>
  {#each nodes as node}
    <Node node={node}/>
	{/each}
{/if}
