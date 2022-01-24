<template>
  <section>
    <!-- ToDo: -->
    <!-- Hide other buttons when one is selected -->
    <!-- Also create a reset button on the side to reset pokemons and select a new type -->
    <!-- Reset button should nullify pokemons and bring back all the type buttons -->

    <!-- or -->

    <!-- Indicate which button was selected either by button color change or button background color change - use state: typeSelected or something like that -->

    <div class="type__btns">
      <button
        class="type__btns-btn"
        v-for="(type, index) in pokemonTypes"
        :key="`type-${index}`"
        @click="getPokemonsByType(type.url)"
      >
        {{ type.name }}
      </button>
    </div>

    <div v-if="isLoading && pokemons.length === 0">
      <BaseSpinner />
    </div>

    <div class="pokemons" v-else>
      <Pokemon
        v-for="pokemon in pokemons"
        :key="`type-${pokemon.id}`"
        :pokemon="pokemon"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseSpinner from '../base/BaseSpinner.vue';
import Pokemon from '../components/Pokemon.vue';

export default {
  name: 'Poketypes',

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
    ...mapGetters(['pokemonTypes', 'pokemons']),
  },

  created() {
    this.getPokemonTypes();
  },

  methods: {
    ...mapActions(['fetchPokemonTypes', 'fetchPokemonsByType']),

    async getPokemonTypes() {
      this.isLoading = true;

      try {
        await this.fetchPokemonTypes();
      } catch (error) {
        console.error('error: ', error);
      }

      this.isLoading = false;
    },

    async getPokemonsByType(typeUrl) {
      this.isLoading = true;

      try {
        await this.fetchPokemonsByType(typeUrl);
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

  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-gap: 1rem;
  width: 100vw;
  width: 100vw;
  max-width: 100%;
}

.type__btns {
  @include set-container;
  @include set-width(4rem);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100vw;
  max-width: 100%;

  &-btn {
    font-size: 1.3rem;
    padding: 0.5rem 0.7rem;
    border-radius: 6px;
    background: $red;
    color: $white;
    font-family: $primary-font;
    border: none;
    cursor: pointer;
    width: 7rem;
    text-align: center;
    text-transform: capitalize;
    margin-right: 1rem;
    margin-top: 1rem;
  }
}
</style>
