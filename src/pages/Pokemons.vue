<template>
  <section>
    <div v-if="isLoading">
      <BaseSpinner />
    </div>
    <div class="pokemons">
      <Pokemon
        v-for="(pokemon, index) in pokemons"
        :key="`pokemon-${index}`"
        :pokemon="pokemon"
      />
    </div>

    <!-- Use scroll-reload to fetch more pokemons -->
    <!-- Button isn't pushing back up after going to next page -->
    <div class="footer">
      <button
        class="pg-btn"
        v-if="hasPreviousPageUrl"
        @click="getPokemons(previousPageUrl)"
      >
        Previous
      </button>
      <button
        class="pg-btn"
        v-if="hasNextPageUrl"
        @click="getPokemons(nextPageUrl)"
      >
        Next
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseSpinner from '@/base/BaseSpinner.vue';
import Pokemon from '@/components/Pokemon.vue';

export default {
  name: 'Pokemons',

  components: {
    BaseSpinner,
    Pokemon,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  // Temp fix for the scrollToTop stuff
  watch: {
    nextPageUrl: function (val) {
      if (val) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    },
  },

  computed: {
    ...mapGetters(['pokemons', 'previousPageUrl', 'nextPageUrl']),

    hasPreviousPageUrl() {
      return this.previousPageUrl !== null;
    },

    hasNextPageUrl() {
      return this.nextPageUrl !== null;
    },
  },

  created() {
    this.getPokemons();
  },

  methods: {
    ...mapActions(['fetchPokemons']),

    async getPokemons(payload = '') {
      this.isLoading = true;

      try {
        await this.fetchPokemons(payload);
      } catch (error) {
        console.error('error: ', error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.pokemons {
  @include set-container;
  @include set-width(4rem);

  font-family: $primary-font;

  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 1.4rem;
  width: 100vw;
  // max-width: 70%;

  @include respond(tab-port) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    padding: 1rem 2rem;
  }
}

.footer {
  text-align: center;
  font-family: $primary-font;
  margin-bottom: 1rem;

  .pg-btn {
    font-size: 1rem;
    padding: 0.5rem 0.7rem;
    border-radius: 6px;
    background: $red;
    color: $white;
    border: none;
    cursor: pointer;
    width: 7rem;
    text-align: center;

    &:first-of-type {
      margin-right: 1rem;
    }
  }
}
</style>
