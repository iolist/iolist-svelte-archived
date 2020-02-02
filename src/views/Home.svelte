<script>
  import {onMount} from 'svelte';
  import {link} from 'svelte-spa-router';
  import Loader from '../components/Loader.svelte';
  import {fetch as fetchLists, lists} from '../store/lists.js';


  onMount(fetchLists);
</script>

<style global lang="scss">
  @import 'src/styles/_variables.scss';
	h1 {
		color: $border-light;
	}
</style>

<h1>This is Home page</h1>
<div class="row"><div class="col-1"></div></div>
{#if $lists.error}
	{$lists.error}
{:else if $lists.isFetching}
	<Loader/>
{:else}
	<ul>
		{#each $lists.value as item}
			<li>{item.id}
        <a href="#/list/{item.id}">
          {item.name}
        </a>
      </li>
		{/each}
	</ul>
{/if}
