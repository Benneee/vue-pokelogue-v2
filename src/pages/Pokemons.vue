<template>
  <section>Pokemons</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Pokemons',

  computed: {
    ...mapGetters(['pokemons']),
  },

  created() {
    this.getPokemons();
  },

  methods: {
    ...mapActions(['fetchPokemons']),

    async getPokemons() {
      this.isLoading = true;

      try {
        await this.fetchPokemons();
      } catch (error) {
        console.error('error: ', error);
      }

      this.isLoading = false;
    },
  },
};
</script>

<style></style>
