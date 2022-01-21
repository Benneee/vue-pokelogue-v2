<template>
  <section>
    <div>
      <button v-if="hasPreviousPageUrl" @click="getPokemons(previousPageUrl)">
        Previous
      </button>
      <button v-if="hasNextPageUrl" @click="getPokemons(nextPageUrl)">
        Next
      </button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Pokemons',

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

<style></style>
