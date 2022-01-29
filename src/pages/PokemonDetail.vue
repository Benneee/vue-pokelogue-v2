<template>
  <section></section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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

  computed: {
    ...mapGetters(['pokemon']),
  },

  created() {
    this.getPokemonDetails(this.pokemonId);
  },

  mounted() {
    console.log('pokemon details: ', this.pokemon);
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
