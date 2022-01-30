<template>
  <section>
    <base-card>
      <div class="header">
        <h1>Lost??</h1>
      </div>
      <div class="content">
        <img src="@/assets/images/poke-img.png" alt="Pokemon" />
        <p>It looks like you lost your way</p>

        <router-link to="/pokemons"> Let's go home</router-link>
      </div>
    </base-card>
  </section>
</template>

<script>
import BaseCard from '@/base/BaseCard.vue';

export default {
  name: 'Favorites',

  components: {
    BaseCard,
  },
};
</script>

<style scoped lang="scss">
.card {
  max-width: 32rem;
  text-align: center;
  font-family: $primary-font;
  padding: 1.5rem;

  .header {
    font-size: 1.5rem;
  }

  .content {
    img {
      animation: swing ease-in-out 1s infinite alternate;
    }

    p {
      margin-bottom: 0.4rem;
    }
    a {
      text-decoration: underline;
    }
  }
}

@keyframes swing {
  0% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(-3deg);
  }
}
</style>
