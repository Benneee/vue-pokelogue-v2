<template>
  <section class="card">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'BaseCard',
};
</script>

<style scoped lang="scss">
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  /* padding: 1rem; */
  margin: 2rem auto;
  width: 32rem;

  @include respond(tab-port) {
    width: unset;
  }
}
</style>
