import { getPokemonId, apiUrl, buildUpPokemonDetails } from '../helpers';

const imageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
let pokemonTypesUrl = 'https://pokeapi.co/api/v2/type';
let noImg = '../assets/images/no-img.png';

export default {
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
    let favesArray = [];
    const favouritePokemons = JSON.parse(
      localStorage.getItem('favouritePokemons'),
    );
    if (favouritePokemons) {
      const newFavourites = [payload, ...favouritePokemons];
      const noDuplicates = newFavourites.filter(
        (v, i, a) => a.findIndex((pokemon) => pokemon.id === v.id) === i,
      );
      localStorage.removeItem('favouritePokemons');
      localStorage.setItem('favouritePokemons', JSON.stringify(noDuplicates));
    } else {
      favesArray.push(payload);
      localStorage.setItem('favouritePokemons', JSON.stringify(favesArray));
    }
  },

  unFavoritePokemon(context, payload) {
    const favouritePokemons = JSON.parse(
      localStorage.getItem('favouritePokemons'),
    );

    if (favouritePokemons) {
      const updatedFavorites = favouritePokemons.filter(
        (pokemon) => pokemon.id !== payload,
      );
      localStorage.removeItem('favouritePokemons');
      localStorage.setItem(
        'favouritePokemons',
        JSON.stringify(updatedFavorites),
      );
      context.commit('setFavorites', updatedFavorites);
    }
  },

  fetchFavorites(context) {
    const favouritePokemons = JSON.parse(
      localStorage.getItem('favouritePokemons'),
    );
    if (favouritePokemons) {
      const noDuplicates = favouritePokemons.filter(
        (v, i, a) => a.findIndex((pokemon) => pokemon.id === v.id) === i,
      );
      context.commit('setFavorites', noDuplicates);
    } else {
      context.commit('setFavorites', []);
    }
  },

  async fetchPokemonDetails(context, payload) {
    const response = await fetch(`${apiUrl}${payload}`);
    const responseData = await response.json();

    if (!response.ok) {
      console.error('Error occurred!');
    } else {
      const { name, id, sprites } = responseData;
      const fullPokemonData = {
        name,
        img: sprites.front_default,
        id,
      };
      const details = buildUpPokemonDetails(responseData);
      context.commit('setPokemon', details);
      context.commit('setPokemonForFavorite', fullPokemonData);
    }
  },
};
