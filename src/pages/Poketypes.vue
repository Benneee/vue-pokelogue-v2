<template>
  <section>
    <div class="type__btns">
      <button
        class="type__btns-btn"
        v-for="(type, index) of pokemonTypes"
        :key="`type-${index}`"
      >
        {{ type.name }}
      </button>
    </div>

    <div v-if="isLoading">
      <BaseSpinner />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseSpinner from '../base/BaseSpinner.vue';

export default {
  name: 'Poketypes',

  components: {
    BaseSpinner,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters(['pokemonTypes']),
  },

  created() {
    this.getPokemonTypes();
  },

  methods: {
    ...mapActions(['fetchPokemonTypes']),

    async getPokemonTypes() {
      this.isLoading = true;

      try {
        await this.fetchPokemonTypes();
      } catch (error) {
        console.error('error: ', error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.type__btns {
  @include set-container;
  @include set-width(4rem);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
  max-width: 100%;

  &-btn {
    font-size: 1.3rem;
    padding: 0.5rem 0.7rem;
    border-radius: 6px;
    background: $red;
    color: $white;
    font-family: $primary-font;
    border: none;
    cursor: pointer;
    width: 7rem;
    text-align: center;
    text-transform: capitalize;
    margin-right: 1rem;
    margin-top: 1rem;
  }
}
</style>
