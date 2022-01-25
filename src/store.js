import { createStore } from 'vuex';
import getPokemonId from './helpers';

const imageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let pokemonTypesUrl = 'https://pokeapi.co/api/v2/type';
let noImg = '../assets/images/no-img.png';

const store = createStore({
  state() {
    return {
      pokemons: [],
      pokemonsFromType: [],
      pokeTypes: [],
      favourites: [],
      pokemon: {},
      nextPageUrl: null,
      previousPageUrl: null,
      selectedPokemonType: null,
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

    pokemonsFromType(state) {
      return state.pokemonsFromType;
    },

    selectedPokemonType(state) {
      return state.selectedPokemonType;
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

    setPokemonsFromType(state, payload) {
      state.pokemonsFromType = payload;
    },

    setSelectedPokemonType(state, payload) {
      state.selectedPokemonType = payload;
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

    async fetchPokemonsByType(context, payload) {
      const response = await fetch(payload);
      const responseData = await response.json();

      if (!response.ok) {
        console.error('Error occurred');
      } else {
        const { pokemon } = responseData;

        const pokemonsByType = pokemon.map((p) => {
          return {
            name: p.pokemon.name,
            id: getPokemonId(p.pokemon.url),
            url: p.pokemon.url,
            img:
              `${imageUrl}${getPokemonId(p.pokemon.url)}.png` !== null
                ? `${imageUrl}${getPokemonId(p.pokemon.url)}.png`
                : noImg,
          };
        });
        context.commit('setPokemonsFromType', pokemonsByType);
      }
    },

    saveSelectedPokemonType(context, payload) {
      context.commit('setSelectedPokemonType', payload);
    },

    // fetchPokemonDetails,
    // fetchFavorites
  },
});

export default store;
