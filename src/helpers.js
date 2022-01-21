export default function getPokemonId(url) {
  return Number(url.split('/')[6]);
}
