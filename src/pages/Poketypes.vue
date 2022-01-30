<template>
  <section>
    <div class="type__btns">
      <button
        class="type__btns-btn"
        :style="{
          backgroundColor: isSelectedBtn(type.url) ? '#000' : '#a31b1b',
        }"
        v-for="(type, index) in pokemonTypes"
        :key="`type-${index}`"
        @click="getPokemonsByType(type.url)"
      >
        {{ type.name }}
      </button>
    </div>

    <div v-if="isLoading && pokemonsFromType.length === 0">
      <BaseSpinner />
    </div>

    <div class="pokemons" v-else>
      <Pokemon
        v-for="pokemon in pokemonsFromType"
        :key="`type-${pokemon.id}`"
        :pokemon="pokemon"
        :show-favorite="true"
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
    ...mapGetters(['pokemonTypes', 'pokemonsFromType', 'selectedPokemonType']),
  },

  created() {
    this.getPokemonTypes();
  },

  methods: {
    ...mapActions([
      'fetchPokemonTypes',
      'fetchPokemonsByType',
      'saveSelectedPokemonType',
    ]),

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
      this.saveSelectedPokemonType(typeUrl);
      this.isLoading = true;

      try {
        await this.fetchPokemonsByType(typeUrl);
      } catch (error) {
        console.error('error: ', error);
      }
      this.isLoading = false;
    },

    isSelectedBtn(url) {
      return url === this.selectedPokemonType;
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

  @include respond(tab-port) {
    @include set-width(0rem);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 10px;
    width: 100vw;
    max-width: 100%;
  }

  &-btn {
    font-size: 1.3rem;
    padding: 0.5rem 0.7rem;
    border-radius: 20px;
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

    @include respond(tab-port) {
      padding: 0.5rem 0.7rem;
      margin: 0.5rem;
      border-radius: 20px;
      width: 4.5rem;
      font-size: 0.9rem;
    }
  }
}
</style>
