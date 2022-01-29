import { createStore } from 'vuex';
import { getPokemonId, apiUrl, buildUpPokemonDetails } from './helpers';

const imageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
let pokemonTypesUrl = 'https://pokeapi.co/api/v2/type';
let noImg = '../assets/images/no-img.png';

const store = createStore({
  state() {
    return {
      pokemons: [],
      pokemonsFromType: [],
      pokeTypes: [],
      favouritePokemons: [],
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

    getFavorites(state) {
      return state.favouritePokemons;
    },

    pokemon(state) {
      return state.pokemon;
    },
  },

  mutations: {
    setExtraPokemons(state, payload) {
      const pokemons = state.pokemons;
      const increasedPokemons = [...pokemons, ...payload];

      state.pokemons = increasedPokemons;
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

    setFavorites(state, payload) {
      state.favouritePokemons = payload;
    },

    setPokemon(state, payload) {
      state.pokemon = payload;
    },
  },

  actions: {
    collectPokemons(context, pokemonsArray) {
      context.commit('setExtraPokemons', pokemonsArray);
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

    async fetchPokemonsByType(context, url) {
      const response = await fetch(url);
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

    async fetchNewPokemons(context, url) {
      const response = await fetch(url);
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

        context.commit('setExtraPokemons', pokemons);
        context.commit('setNextPageUrl', next);
        context.commit('setPreviousPageUrl', previous);
      }
    },

    saveSelectedPokemonType(context, payload) {
      context.commit('setSelectedPokemonType', payload);
    },

    favoritePokemon(_, payload) {
      const favouritePokemons = JSON.parse(
        localStorage.getItem('favouritePokemons'),
      );
      if (favouritePokemons) {
        const newFavourites = [payload, ...favouritePokemons];
        localStorage.removeItem('favouritePokemons');
        localStorage.setItem(JSON.stringify(newFavourites));
        console.log('favorites set!');
      }
    },

    fetchFavorites(context) {
      const favouritePokemons = JSON.parse(
        localStorage.getItem('favouritePokemons'),
      );
      if (favouritePokemons) {
        context.commit('setFavorites', favouritePokemons);
      }
      context.commit('setFavorites', []);
    },

    async fetchPokemonDetails(context, payload) {
      const response = await fetch(`${apiUrl}${payload}`);
      const responseData = await response.json();

      if (!response.ok) {
        console.error('Error occurred!');
      } else {
        const details = buildUpPokemonDetails(responseData);
        context.commit('setPokemon', details);
      }
    },
  },
});

export default store;
