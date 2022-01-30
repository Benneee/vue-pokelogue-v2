<template>
  <section>
    <div v-if="isLoading && pokemons.length === 0">
      <BaseSpinner />
    </div>
    <div class="pokemons">
      <Pokemon
        v-for="(pokemon, index) in pokemons"
        :key="`pokemon-${index}`"
        :pokemon="pokemon"
      />
      <Observer @intersect="intersected" />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseSpinner from '@/base/BaseSpinner.vue';
import Pokemon from '@/components/Pokemon.vue';
import Observer from '@/components/Observer.vue';
import { apiUrl, getPokemonId, imageUrl } from '../helpers';

export default {
  name: 'Pokemons',

  components: {
    BaseSpinner,
    Pokemon,
    Observer,
  },

  data() {
    return {
      isLoading: false,
      offset: 0,
    };
  },

  computed: {
    ...mapGetters(['pokemons']),
  },

  methods: {
    ...mapActions(['collectPokemons', 'fetchNewPokemons']),

    async intersected() {
      this.isLoading = true;
      const response = await fetch(`${apiUrl}?offset=${this.offset}&limit=20`);
      const pokemonsData = await response.json();
      const { results } = pokemonsData;

      const pokemons = results.map((pokemon) => {
        return {
          name: pokemon.name,
          img: `${imageUrl}${getPokemonId(pokemon.url)}.png`,
          id: getPokemonId(pokemon.url),
        };
      });

      this.offset += 20;

      // Set first set of pokemons in state
      this.collectPokemons(pokemons);

      await this.fetchNewPokemons(`${apiUrl}?offset=${this.offset}&limit=20`);

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

  @include respond(tab-port) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    padding: 1rem 1rem;
  }
}
</style>
