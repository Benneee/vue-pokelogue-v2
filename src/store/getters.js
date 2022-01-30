export default {
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

  favouritePokemons(state) {
    return state.favouritePokemons;
  },

  pokemon(state) {
    return state.pokemon;
  },

  pokemonForFavorite(state) {
    return state.pokemonForFavorite;
  },
};
