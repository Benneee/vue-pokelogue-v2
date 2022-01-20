<template>
  <section>
    <TheHeader />
    <router-view></router-view>
  </section>
</template>

<script>
import TheHeader from './components/TheHeader.vue';

export default {
  name: 'App',

  components: {
    TheHeader,
  },
};
</script>

<style></style>
