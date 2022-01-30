<template>
  <section class="details">
    <BaseSpinner v-if="isLoading" />

    <base-card>
      <div class="header">
        <i class="mdi mdi-chevron-left" @click="goToPreviousPage"></i>
        <button class="fave-btn" @click="addToFavorites">
          Add to Favorites
        </button>
      </div>

      <div class="pokemon">
        <h1 class="pokemon__name">{{ pokemon.name }}</h1>

        <div class="pokemon__img-section">
          <p class="pokemon__id">#{{ pokemonId }}</p>

          <img :src="pokemon.pokemonImg" :alt="pokemon.name" />
        </div>
      </div>

      <div class="stats" v-if="pokemon">
        <div class="stats__height">
          <p class="muted">Height</p>
          <h3 class="item">{{ pokemon.height }}</h3>
        </div>
        <div class="stats__weight">
          <p class="muted">Weight</p>
          <h3 class="item">{{ pokemon.weight }}</h3>
        </div>
        <div class="stats__order">
          <p class="muted">Order</p>
          <h3 class="item">{{ pokemon.order }}</h3>
        </div>
      </div>

      <div class="more__stats" v-if="pokemon">
        <div class="types-abilities">
          <div class="base-xp">
            <h3>Base Experience</h3>
            <div>
              <p>{{ pokemon.base_experience }}XP</p>
            </div>
          </div>

          <h3>Pokemon Types</h3>
          <div class="types">
            <div
              class="type"
              v-for="(value, index) in pokemon.types"
              :key="'value' + index"
            >
              {{ value.type.name }}
            </div>
          </div>

          <h3>Abilities</h3>
          <div class="abilities">
            <div
              class="ability"
              v-for="(value, index) in pokemon.abilities"
              :key="'value' + index"
            >
              {{ value.ability.name }}
            </div>
          </div>

          <h3 v-if="pokemon.held_items && pokemon.held_items.length > 0">
            Held Items
          </h3>
          <div
            class="abilities"
            v-if="pokemon.held_items && pokemon.held_items.length > 0"
          >
            <div
              class="ability"
              v-for="(value, index) in pokemon.held_items"
              :key="'value' + index"
            >
              {{ removeAnHyphen(value.item.name) }}
            </div>
          </div>
        </div>

        <div class="base-stats" v-if="pokemon.usefulStats">
          <div class="stat">
            <p>
              <span class="muted"> HP </span>
              <span> {{ pokemon.usefulStats.hp }}% </span>
            </p>

            <progress
              id="hp"
              max="100"
              :value="pokemon.usefulStats.hp"
            ></progress>
          </div>

          <div class="stat">
            <p>
              <span class="muted"> Attack </span>
              <span> {{ pokemon.usefulStats.attack }}% </span>
            </p>

            <progress
              id="attack"
              max="100"
              :value="pokemon.usefulStats.attack"
            ></progress>
          </div>

          <div class="stat">
            <p>
              <span class="muted"> Defense </span>
              <span> {{ pokemon.usefulStats.defense }}% </span>
            </p>

            <progress
              id="defense"
              max="100"
              :value="pokemon.usefulStats.defense"
            ></progress>
          </div>

          <div class="stat">
            <p>
              <span class="muted"> Speed </span>
              <span> {{ pokemon.usefulStats.speed }}% </span>
            </p>

            <progress
              id="speed"
              :value="pokemon.usefulStats.speed"
              max="100"
            ></progress>
          </div>

          <div class="stat">
            <p>
              <span class="muted"> Special Attack </span>
              <span> {{ pokemon.usefulStats.specialAttack }}% </span>
            </p>

            <progress
              id="specialAttack"
              max="100"
              :value="pokemon.usefulStats.specialAttack"
            ></progress>
          </div>

          <div class="stat">
            <p>
              <span class="muted"> Special Defense </span>
              <span> {{ pokemon.usefulStats.specialDefense }}% </span>
            </p>

            <progress
              id="specialDefense"
              max="100"
              :value="pokemon.usefulStats.specialDefense"
            ></progress>
          </div>
        </div>
      </div>
    </base-card>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BaseCard from '../base/BaseCard.vue';
import BaseSpinner from '../base/BaseSpinner.vue';
import { removeHyphen } from '../helpers';

export default {
  name: 'PokemonDetail',

  components: {
    BaseCard,
    BaseSpinner,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  props: {
    pokemonId: {
      type: [Number, String],
      required: true,
    },
  },

  computed: {
    ...mapGetters(['pokemon', 'favouritePokemons', 'pokemonForFavorite']),
  },

  created() {
    this.getPokemonDetails(this.pokemonId);
    this.getFavorites();
  },

  methods: {
    ...mapActions(['fetchPokemonDetails', 'favoritePokemon', 'fetchFavorites']),

    removeAnHyphen(word) {
      return removeHyphen(word);
    },

    async getPokemonDetails(pokemonId) {
      this.isLoading = true;
      try {
        await this.fetchPokemonDetails(pokemonId);
      } catch (error) {
        console.error('error: ', error);
      }
      this.isLoading = false;
    },

    getFavorites() {
      this.fetchFavorites();
    },

    goToPreviousPage() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/pokemons');
    },

    addToFavorites() {
      const faveIDs = this.favouritePokemons.map((pokemon) => pokemon.id);
      if (faveIDs && faveIDs.includes(this.pokemonForFavorite.id)) {
        this.$notify({
          title: 'Pokelogue',
          text: `${this.pokemonForFavorite.name} already in favorites!`,
        });
      } else {
        this.favoritePokemon(this.pokemonForFavorite);
        this.$notify({
          title: 'Pokelogue',
          text: `${this.pokemonForFavorite.name} added to favorites`,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.details {
  padding: 0.5rem 1rem;
  font-family: $primary-font;

  .card {
    background: #f3f9ef;

    .header {
      background: $white;
      display: flex;
      justify-content: space-between;
      padding: 1rem;

      i {
        font-size: 2.5rem;
        cursor: pointer;
      }

      .fave-btn {
        width: 157px;
        height: 50px;
        background: #3558cd;
        box-shadow: 0px 5px 22px 4px rgba(0, 0, 0, 0.06),
          0px 12px 17px 2px rgba(0, 0, 0, 0.07),
          0px 7px 8px -4px rgba(0, 0, 0, 0.1);
        border-radius: 36px;
        border: none;
        color: $white;
        cursor: pointer;
        transition: all 0.5s;

        &:hover {
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.26);
        }
      }
    }

    .pokemon {
      padding: 1.5rem;
      background: #f3f9ef;

      &__name {
        text-transform: capitalize;
        font-size: 2.5rem;
      }

      &__img-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        img {
          width: 150px;
          height: 135px;
        }
      }

      &__id {
        font-size: 2rem;
      }
    }

    .stats {
      background: $white;
      display: flex;
      justify-content: space-between;
      padding: 1.5rem;

      &__height,
      &__weight,
      &__order {
        display: flex;
        flex-direction: column;

        .item {
          font-weight: normal;
          font-size: 1.8rem;
          line-height: 21px;
        }
      }
    }

    .more__stats {
      padding: 1.5rem 1.5rem 3rem 1.5rem;
      margin-top: 1.5rem;
      background: $white;

      display: flex;
      justify-content: space-around;
      align-items: flex-start;

      @include respond(tab-port) {
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 1.5rem 1.5rem 1.8rem 1.5rem;
      }

      .base-stats {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .stat {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.4rem;
        }
      }

      .types-abilities {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;

        .base-xp {
          margin-bottom: 0.4rem;
        }

        .abilities,
        .types {
          display: flex;
          margin-bottom: 0.4rem;
        }

        h3 {
          font-size: 1.1rem;
          color: $muted;
          margin-bottom: 3px;
        }

        p {
          font-size: 1.5rem;
        }

        .type,
        .ability {
          margin: 0 10px 10px 0;
          padding: 5px 10px;
          border-radius: 20px;
          color: #fff;
          font-size: 1rem;
          letter-spacing: 2px;
          text-transform: capitalize;
          word-wrap: none;
          word-break: keep-all;

          @include respond(tab-port) {
            font-size: 0.8rem;
          }
        }

        .type {
          background-color: #0a2e50;
        }
        .ability {
          background-color: #c73015;
        }
      }
    }
  }

  .muted {
    color: $muted;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 33px;

    @include respond(tab-port) {
      font-size: 1.1rem;
    }
  }

  progress {
    background-color: #f3f3f3;
    border: 0;
    height: 10px;
    border-radius: 9px;
  }
  progress::-webkit-progress-bar {
    background-color: #f3f3f3;
    border: 0;
    height: 10px;
    border-radius: 9px;
  }
  progress::-webkit-progress-value {
    background-color: $red;
    border-radius: 9px;
  }
  progress::-moz-progress-bar {
    background-color: #f3f3f3;
    border: 0;
    height: 10px;
    border-radius: 9px;
  }
}
</style>
