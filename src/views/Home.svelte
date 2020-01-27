<script>
  import {onMount} from 'svelte';
  import {link} from 'svelte-spa-router';
  import {fetch as fetchLists, lists} from '../store/lists.js';

  onMount(fetchLists);
</script>

<style>
	h1 {
		color: red;
	}
</style>

<h1>This is Home page</h1>
{#if $lists.error}
	{$lists.error}
{:else if $lists.isFetching}
	<p>Loading...</p>
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
