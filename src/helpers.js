function getPokemonId(url) {
  return Number(url.split('/')[6]);
}
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

const imageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

function buildUpPokemonDetails(data) {
  if (data) {
    const { name, base_experience, height, weight, types, abilities, order } =
      data;
    const pokemonImg = data.sprites.front_default;
    let usefulStats = {};
    let baseStats = [...data['stats']];
    baseStats.map((stat) => {
      switch (stat.stat.name) {
        case 'hp':
          usefulStats['hp'] = stat['base_stat'];
          break;
        case 'attack':
          usefulStats['attack'] = stat['base_stat'];
          break;
        case 'defense':
          usefulStats['defense'] = stat['base_stat'];
          break;
        case 'speed':
          usefulStats['speed'] = stat['base_stat'];
          break;
        case 'special-attack':
          usefulStats['specialAttack'] = stat['base_stat'];
          break;
        case 'special-defense':
          usefulStats['specialDefense'] = stat['base_stat'];
          break;
      }
    });

    return {
      usefulStats,
      pokemonImg,
      name,
      base_experience,
      height,
      weight,
      types,
      abilities,
      order,
    };
  }
}

export { getPokemonId, apiUrl, imageUrl, buildUpPokemonDetails };
