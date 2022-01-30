<template>
  <section>
    <div
      class="pokemons"
      v-if="favouritePokemons && favouritePokemons.length > 0"
    >
      <Pokemon
        v-for="(pokemon, index) in favouritePokemons"
        :key="`pokemon-${index}`"
        :pokemon="pokemon"
      />
    </div>
    <div v-else>
      <base-card>
        <div class="header">
          <h1>Favorites</h1>
        </div>
        <div class="content">
          <img src="@/assets/images/poke-img.png" alt="Pokemon" />
          <p>You currently have no favorite pokemon!</p>

          <router-link to="/pokemons"> Go home to add to favorites</router-link>
        </div>
      </base-card>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Pokemon from '@/components/Pokemon.vue';
import BaseCard from '@/base/BaseCard.vue';

export default {
  name: 'Favorites',

  components: {
    Pokemon,
    BaseCard,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters(['favouritePokemons']),
  },

  created() {
    this.getFavorites();
  },

  methods: {
    ...mapActions(['fetchFavorites']),

    getFavorites() {
      this.fetchFavorites();
    },
  },
};
</script>

<style scoped lang="scss">
.pokemons {
  @include set-container;
  @include set-width(4rem);

  font-family: $primary-font;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(1px, 1fr));
  grid-gap: 1.4rem;
  width: 100vw;

  @include respond(tab-port) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    padding: 1rem 1rem;
  }
}

.card {
  width: 32rem;
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
