<script>
  import {onMount} from 'svelte';
  import {link} from 'svelte-spa-router';
  import Loader from '../components/Loader.svelte';
  import {fetch as fetchLists, lists} from '../store/lists.js';

  onMount(fetchLists);
</script>

<style lang="scss">
  @import 'src/styles/_variables.scss';
	h1 {
    color: $text-black;
    margin-bottom: 30px;
  }
  .list {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    border-radius: 10px;
    background: $body-bg;
    text-decoration: none;
    color: $text-black;
    &:hover {
      background: $light-grey-bg;
    }
  }
</style>

<h1>This is Home page</h1>
{#if $lists.error}
	{$lists.error}
{:else if $lists.isFetching}
	<Loader/>
{:else}
	<div class="row">
		{#each $lists.value as item}
      <a class="col-12 col-6-m list" href="#/list/{item.id}">
        {item.name}
      </a>
		{/each}
	</div>
{/if}
