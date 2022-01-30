export default {
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

  setPokemonForFavorite(state, payload) {
    state.pokemonForFavorite = payload;
  },
};
