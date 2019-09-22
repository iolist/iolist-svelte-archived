<script>
	import { listsStore } from '../store/lists.js';
	import { onDestroy } from 'svelte';

	console.log(listsStore);

	let lists;
	let loading;
	let isError;

	const unsubscribe = listsStore.subscribe(({ value, error, isFetching }) => {
		lists = value;
		isError = error;
		loading = isFetching;
	});

	onDestroy(unsubscribe);
</script>

<style>
	h1 {
		color: red;
	}
</style>

<h1>This is Home page</h1>

{#if isError} 
	{isError}
{:else if loading}
	<p>Loading...</p>
{:else}
	<ul>
		{#each lists as item}
			<li>{item.id} {item.name}</li>
		{/each}
	</ul>
{/if}
