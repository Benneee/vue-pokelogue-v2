<template>
  <section>
    <ul>
      <li v-for="(type, index) in pokemonTypes" :key="`type-${index}`">
        {{ type.name }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Poketypes',

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters(['pokemonTypes']),
  },

  created() {
    this.getPokemonTypes();
  },

  methods: {
    ...mapActions(['fetchPokemonTypes']),

    async getPokemonTypes() {
      this.isLoading = true;

      try {
        await this.fetchPokemonTypes();
      } catch (error) {
        console.error('error: ', error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
