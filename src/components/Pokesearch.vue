<template>
  <section class="search-area">
    <form @submit.enter.prevent="sendPokemonData">
      <div>
        <input
          type="text"
          v-model="pokemon"
          placeholder="Press 'enter' after typing pokemon entry..."
          @blur="validate"
        />
        <small v-if="errorAvailable">Kindly enter a pokemon name</small>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Pokesearch',

  emits: ['searchEntry'],

  data() {
    return {
      pokemon: '',
      errorAvailable: false,
    };
  },

  methods: {
    validate() {
      return (this.errorAvailable =
        this.pokemon.length <= 0 && this.pokemon === '');
    },

    sendPokemonData() {
      if (!this.validate()) {
        this.$emit('searchEntry', this.pokemon);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.search-area {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;

  @include respond(tab-port) {
    display: block;
    width: 100%;
  }

  small {
    margin-top: 10px;
    font-family: $primary-font;
    display: block;
    color: $red;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 50vw;

    border: none;
    border-bottom: 1px solid $blue;
    font-family: $primary-font;

    @include respond(tab-port) {
      width: 100%;
    }
  }
}
</style>
