<template>
  <!-- ToDo: add a tooltip element especially for truncated names -->
  <article class="pokemon__card">
    <div class="pokemon__card-img" @click="goToPokemonDetail(pokemon.id)">
      <img :src="pokemon.img" alt="" />
    </div>
    <div class="pokemon__card-details">
      <p class="id">#{{ pokemon.id }}</p>

      <p class="name">{{ shortenName(pokemon.name) }}</p>
    </div>
  </article>
</template>

<script>
import ShortenName from '../mixins/ShortenName';

export default {
  name: 'Pokemon',

  mixins: [ShortenName],

  props: {
    pokemon: {
      type: Object,
      required: false,
    },
  },

  methods: {
    goToPokemonDetail(pokemonId) {
      this.$router.push({ name: 'pokemon-detail', params: { pokemonId } });
    },
  },
};
</script>

<style scoped lang="scss">
.pokemon__card {
  height: 180px;
  width: 160px;
  background: $white;
  border-radius: 4px;
  font-family: $primary-font;
  border: 1px solid $white;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  @include respond(tab-port) {
    height: 165px;
    width: 130px;
  }

  &-img {
    background: #f3f9ef;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 104px;
    padding: 0.3rem;
    cursor: pointer;

    img {
      height: fit-content;
      height: -webkit-fill-available;
    }
  }

  &-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;

    .id {
      color: $muted;
      font-size: 1rem;
      font-weight: 300;
    }

    .name {
      font-size: 1.3rem;
      margin-top: 0.3rem;
      font-weight: bold;
      text-transform: capitalize;

      @include respond(tab-port) {
        font-size: 1.1rem;
      }
    }

    .properties {
      font-size: 1rem;
      color: $muted;
      font-weight: 300;
    }
  }
}
</style>
