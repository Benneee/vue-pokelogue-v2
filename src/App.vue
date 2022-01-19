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

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');
* {
  box-sizing: border-box;
}
html {
  font-family: 'Noto Sans', sans-serif;
}
body {
  margin: 0;
}
</style>
