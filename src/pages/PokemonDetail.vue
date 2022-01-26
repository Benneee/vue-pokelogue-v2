<template>
  <section></section>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'PokemonDetail',

  data() {
    return {
      isLoading: false,
    };
  },

  props: {
    pokemonId: {
      type: [Number, String],
      required: true,
    },
  },

  created() {
    this.getPokemonDetails(this.pokemonId);
  },

  methods: {
    ...mapActions(['fetchPokemonDetails']),

    async getPokemonDetails(pokemonId) {
      this.isLoading = true;
      try {
        await this.fetchPokemonDetails(pokemonId);
      } catch (error) {
        console.error('error: ', error);
      }
    },
  },
};
</script>

<style></style>
