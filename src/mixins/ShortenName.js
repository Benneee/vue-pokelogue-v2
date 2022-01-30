export default {
  name: 'ShortenName',

  mounted() {
    this.shortenName();
  },

  methods: {
    shortenName(pokemonName, limit = 10, ellipsis = '...') {
      if (pokemonName) {
        if (pokemonName.includes('-')) {
          const hyphenPosition = pokemonName.indexOf('-');
          limit = hyphenPosition;
          return pokemonName.length > limit
            ? pokemonName.substr(0, limit) + ellipsis
            : pokemonName;
        }
        return pokemonName.length > limit
          ? pokemonName.substr(0, limit) + ellipsis
          : pokemonName;
      }
    },
  },
};
