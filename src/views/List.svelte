<script>
  import {onMount} from 'svelte';
  import {link} from 'svelte-spa-router';

  import Loader from '../components/Loader.svelte';
  import Error from '../components/Error.svelte';
  import Node from '../components/Node.svelte';

  import {getChildNodes} from '../utils/tree.js';
  import {nodes, info, status, fetchList} from '../store/list.js';

  export let params = {};
  onMount(() => fetchList(params.id));

  $: parents = getChildNodes($nodes)
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

{#if $status.error}
	<Error error={$status.error}/>
{:else if $status.isFetching}
	<Loader/>
{:else}
  <h1>{$info.name}</h1>
  {#each parents as node}
    <Node nodeId={node.id}/>
	{/each}
{/if}
