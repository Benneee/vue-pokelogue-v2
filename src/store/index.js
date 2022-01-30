import { createStore } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

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
      pokemonForFavorite: {},
    };
  },

  getters: getters,

  mutations: mutations,

  actions: actions,
});

export default store;
