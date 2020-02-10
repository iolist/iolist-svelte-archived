<script context="module">
  const dropdowns = new Set();
</script>

<script>
  import { onMount, afterUpdate } from 'svelte';
  import { fly } from 'svelte/transition';

  let contentElem;
  let triggerElem;
  let ch;
  let active = false;
  let position = 'top';

  export let closeOnClick = false;
  export let margin = 10;

  onMount(() => {
		dropdowns.add(close);
		return () => dropdowns.delete(close);
  });

  afterUpdate(() => {
		setStyle();
  });

  $: h = triggerElem ? triggerElem.getBoundingClientRect().height : 0;

	export function close() {
    if (active) {
      active = false;
    }
  }

  function closeOthers() {
		dropdowns.forEach(closeF => {
			if (closeF !== close) {
        closeF();
      }
		});
  }

  function toggle() {;
    active = !active;
    active && closeOthers();
  }

	function onScroll() {
		setStyle();
	}
	function onResize() {
		setStyle();
  }

  function setStyle() {
    if (!active) return;
    const contentRect = contentElem.getBoundingClientRect();
    const triggerRect = triggerElem.getBoundingClientRect();
    if (window.innerHeight < contentRect.height)
      return position = 'top';
    if (window.innerHeight - triggerRect.y - triggerRect.height < contentRect.height)
      return position = 'bottom';
    return position = 'top';
  }

  function clickOnContent() {
    if (closeOnClick) {
      close()
    }
  }

</script>

<svelte:window
  on:click={close}
  on:scroll|passive={onScroll}
	on:resize|passive={onResize}
/>
<div class="dropdown" on:click|stopPropagation>
  <div class="dropdown-trigger" on:click={toggle} bind:this={triggerElem}>
    <slot name="trigger"></slot>
  </div>
  {#if active}
    <div class="dropdown-menu" style="{position}: {h + margin}px" transition:fly="{{ y: -50, duration: 150 }}">
      <div class="dropdown-content" bind:this={contentElem} on:click={clickOnContent}>
        <slot name="content"></slot>
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import 'src/styles/_variables.scss';

  .dropdown {
    position: relative;
  }
  .dropdown-trigger {
    position: relative;
    overflow: hidden;
  }
  .dropdown-menu {
    position: absolute;
    left: -10px;
    background: $white-bg;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25);
    border-radius: 5px;
    z-index: 1000;
  }
</style>
