<template>
  <TheHeader />
  <router-view></router-view>
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

<style scoped lang="scss"></style>
