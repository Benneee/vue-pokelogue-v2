import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      pokemons: [],
      pokeTypes: [],
      favourites: [],
      pokemon: {},
    };
  },

  getters: {
    // getPokemons,
    // getPokemonTypes,
    // getFavorites,
    // getPokemon // Details
  },

  mutations: {
    // setPokemons,
    // setPokemonTypes,
    // setFavorites,
    // setPokemon,
  },

  actions: {
    // fetchPokemons,
    // fetchPokemonTypes,
    // fetchPokemonsByType,
    // fetchPokemonDetails,
    // fetchFavorites
  },
});

export default store;
