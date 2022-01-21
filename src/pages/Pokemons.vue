<template>
  <section>
    <div class="pokemons">
      <div v-if="isLoading">
        <BaseSpinner />
      </div>

      <Pokemon v-for="(pokemon, index) in pokemons" :key="`pokemon-${index}`" />
    </div>
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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 1rem;
  width: 100vw;
  // max-width: 70%;
}

.footer {
  text-align: center;
  font-family: $primary-font;
  margin-bottom: 1rem;

  .pg-btn {
    font-size: 1rem;
    padding: 0.8rem 2rem;
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
