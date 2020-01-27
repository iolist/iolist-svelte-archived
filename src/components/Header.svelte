<script>
 import RouterLink from './RouterLink.svelte'
</script>

<div class="header">
  <div class="header-content">
    <RouterLink customClass="header-link"></RouterLink>
  </div>
</div>

<style>
.header {
  background-color: var(--header-bg);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 40px;
}
.header-content {
  max-width: 800px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  height: 100%;
}
.header-link {
  color: var(--text-white);
}
</style>
