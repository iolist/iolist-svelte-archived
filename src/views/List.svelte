<script>
  import {onMount} from 'svelte';
  import {link} from 'svelte-spa-router';

  import Loader from '../components/Loader.svelte';
  import Error from '../components/Error.svelte';
  import Node from '../components/Node.svelte';

  import {unflatten, sortTreeWithChildren} from '../services/tree.js';
  import list from '../store/list.js';

  export let params = {};

  let nodes = [];

  $: if ($list.value && $list.value.nodes) {
    nodes = sortTreeWithChildren(unflatten($list.value.nodes));
  }

  onMount(() => list.fetch(params.id));
</script>

<style lang="scss">
  @import 'src/styles/_variables.scss';
	h1 {
     @include media-breakpoint-up(sm) {
      text-align: left;
    }
    text-align: center;
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
