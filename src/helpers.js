function getPokemonId(url) {
  return Number(url.split('/')[6]);
}
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

const imageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

export { getPokemonId, apiUrl, imageUrl };
