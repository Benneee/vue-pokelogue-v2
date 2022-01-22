import { createStore } from 'vuex';
import getPokemonId from './helpers';

const imageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let pokemonTypesUrl = 'https://pokeapi.co/api/v2/type';

const store = createStore({
  state() {
    return {
      pokemons: [],
      pokeTypes: [],
      favourites: [],
      pokemon: {},
      nextPageUrl: null,
      previousPageUrl: null,
    };
  },

  getters: {
    pokemons(state) {
      return state.pokemons;
    },

    previousPageUrl(state) {
      return state.previousPageUrl;
    },

    nextPageUrl(state) {
      return state.nextPageUrl;
    },

    pokemonTypes(state) {
      return state.pokeTypes;
    },
    // getFavorites,
    // pokemon // Details
  },

  mutations: {
    setPokemons(state, payload) {
      state.pokemons = payload;
    },

    setNextPageUrl(state, payload) {
      state.nextPageUrl = payload;
    },

    setPreviousPageUrl(state, payload) {
      state.previousPageUrl = payload;
    },

    setPokemonTypes(state, payload) {
      state.pokeTypes = payload;
    },
    // setFavorites,
    // setPokemon,
  },

  actions: {
    async fetchPokemons(context, payload = '') {
      let currentUrl = payload !== '' ? payload : apiUrl;

      const response = await fetch(currentUrl);
      const pokemonsData = await response.json();

      if (!response.ok) {
        console.error('Error occurred');
      } else {
        const { next, previous, results } = pokemonsData;

        const pokemons = results.map((pokemon) => {
          return {
            name: pokemon.name,
            img: `${imageUrl}${getPokemonId(pokemon.url)}.png`,
            id: getPokemonId(pokemon.url),
          };
        });

        context.commit('setPokemons', pokemons);
        context.commit('setNextPageUrl', next);
        context.commit('setPreviousPageUrl', previous);
      }
    },
    async fetchPokemonTypes(context) {
      const response = await fetch(pokemonTypesUrl);
      const responseData = await response.json();

      if (!response.ok) {
        console.error('Error occurred');
      } else {
        const { results } = responseData;
        const pokemonTypes = results.filter(
          (type) => !['unknown', 'shadow'].includes(type.name),
        );

        context.commit('setPokemonTypes', pokemonTypes);
      }
    },

    // fetchPokemonsByType,
    // fetchPokemonDetails,
    // fetchFavorites
  },
});

export default store;
