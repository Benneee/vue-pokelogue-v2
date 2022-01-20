import { createStore } from 'vuex';

// const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

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
    getPokemons(state) {
      return state.pokemons;
    },
    // getPokemonTypes,
    // getFavorites,
    // getPokemon // Details
  },

  mutations: {
    setPokemons(state, payload) {
      state.pokemons = payload;
    },
    // setPokemonTypes,
    // setFavorites,
    // setPokemon,
  },

  actions: {
    async fetchPokemons(context) {
      const response = await fetch(apiUrl);
      const pokemonsData = await response.json();

      if (!response.ok) {
        console.error('Error occurred');
      } else {
        console.log('data: ', pokemonsData);

        context.commit('setPokemons', []);
      }
    },
    // fetchPokemonTypes,
    // fetchPokemonsByType,
    // fetchPokemonDetails,
    // fetchFavorites
  },
});

export default store;
