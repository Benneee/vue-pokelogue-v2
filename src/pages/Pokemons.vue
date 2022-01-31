<template>
  <section>
    <Pokesearch @search-entry="search" />
    <div class="pokemons">
      <Pokemon
        v-for="(pokemon, index) in pokemons"
        :key="`pokemon-${index}`"
        :pokemon="pokemon"
        :show-favorite="true"
      />
      <Observer @intersect="intersected" />
    </div>

    <div v-if="isLoading">
      <BaseSpinner />
    </div>

    <base-modal :show="!!error" title="An Error Occurred" @close="handleError">
      <div class="content">
        <img src="@/assets/images/poke-img.png" alt="Pokemon" />
        <p>No pokemon with that title found!</p>
      </div>
    </base-modal>

    <base-modal
      :show="!!searchResult"
      title="Search Result"
      @close="closeModal"
      :fixed="true"
    >
      <div class="content">
        <img :src="searchResult.img" :alt="searchResult.name" />
        <div class="detail">
          <span class="name">{{ searchResult.name }}</span
          >,
          <span
            class="type"
            v-for="(value, index) in searchResult.types"
            :key="'value' + index"
          >
            {{ value.type.name }}
          </span>
        </div>
        <p>
          See more details
          <router-link :to="`/pokemon/${searchResult.id}`"> here </router-link>
        </p>
      </div>
    </base-modal>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseSpinner from '@/base/BaseSpinner.vue';
import Pokemon from '@/components/Pokemon.vue';
import Observer from '@/components/Observer.vue';
import { apiUrl, getPokemonId, imageUrl } from '../helpers';
import Pokesearch from '@/components/Pokesearch.vue';
import BaseModal from '../base/BaseModal.vue';

export default {
  name: 'Pokemons',

  components: {
    BaseSpinner,
    Pokemon,
    Observer,
    Pokesearch,
    BaseModal,
  },

  data() {
    return {
      isLoading: false,
      offset: 0,
      searchResult: null,
      error: null,
      showModal: false,
    };
  },

  computed: {
    ...mapGetters(['pokemons']),
  },

  methods: {
    ...mapActions(['collectPokemons', 'fetchNewPokemons']),

    async intersected() {
      this.isLoading = true;
      const response = await fetch(`${apiUrl}?offset=${this.offset}&limit=20`);
      const pokemonsData = await response.json();
      const { results } = pokemonsData;

      const pokemons = results.map((pokemon) => {
        return {
          name: pokemon.name,
          img: `${imageUrl}${getPokemonId(pokemon.url)}.png`,
          id: getPokemonId(pokemon.url),
        };
      });

      this.offset += 20;

      // Set first set of pokemons in state
      this.collectPokemons(pokemons);

      await this.fetchNewPokemons(`${apiUrl}?offset=${this.offset}&limit=20`);

      this.isLoading = false;
    },

    search(data) {
      this.searchPokemon(data);
    },

    async searchPokemon(pokemonName) {
      try {
        const response = await fetch(`${apiUrl}${pokemonName}`);
        const responseData = await response.json();

        const { name, id, sprites, types } = responseData;
        this.searchResult = {
          name,
          img: sprites.front_default,
          id,
          types,
        };
      } catch (error) {
        console.error('error: ', error);
        this.error = error;
        this.searchResult = null;
        this.showModal = true;
      }
    },

    handleError() {
      this.error = null;
    },

    closeModal() {
      this.searchResult = null;
      this.showModal = false;
    },
  },
};
</script>

<style scoped lang="scss">
.pokemons {
  @include grid-flex;
}

.content {
  text-align: center;
  img {
    animation: swing ease-in-out 1s infinite alternate;
  }

  .detail {
    margin-bottom: 0.4rem;
  }

  .name {
    font-size: 1.2rem;
    text-transform: capitalize;
  }

  p {
    margin-bottom: 0.4rem;
  }
  a {
    text-decoration: underline;
  }
}

@keyframes swing {
  0% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(-3deg);
  }
}
</style>
