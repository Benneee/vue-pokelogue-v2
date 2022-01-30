<template>
  <header class="nav__container">
    <div class="header">
      <div class="header__logo">
        <router-link to="/home">
          <img
            src="https://img.icons8.com/color/36/000000/pikachu-pokemon.png"
          />
        </router-link>
      </div>

      <ul
        class="header__menu"
        :class="[dropdownOpen ? 'active' : '']"
        role="navigation"
        aria-label="Main"
      >
        <li class="header__menu-item" @click="dropdownOpen = false">
          <router-link to="/pokemons">Pokemons</router-link>
        </li>
        <li class="header__menu-item" @click="dropdownOpen = false">
          <router-link to="/poketypes">Poketypes</router-link>
        </li>
        <li class="header__menu-item" @click="dropdownOpen = false">
          <router-link to="/favourites"
            >Favourites
            <span v-if="totalFavorites > 0"> ({{ totalFavorites }})</span>
          </router-link>
        </li>
      </ul>

      <nav class="header__menu-controller" role="navigation" aria-label="Main">
        <div class="header__menu-icons">
          <span
            @click="
              dropdownIcon === 'menu'
                ? (dropdownOpen = true)
                : (dropdownOpen = false)
            "
          >
            <i :class="'mdi mdi-' + dropdownIcon"></i>
          </span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TheHeader',

  data() {
    return {
      dropdownOpen: false,
    };
  },

  computed: {
    ...mapGetters(['favouritePokemons']),

    dropdownIcon() {
      return this.dropdownOpen ? 'close' : 'menu';
    },

    totalFavorites() {
      return this.favouritePokemons.length;
    },
  },

  created() {
    this.getFavorites();
  },

  methods: {
    ...mapActions(['fetchFavorites']),

    getFavorites() {
      this.fetchFavorites();
    },
  },
};
</script>

<style scoped lang="scss">
.nav__container {
  @include set-container;
  font-family: $primary-font;
  .header {
    @include set-width(4rem);
    @include respond(tab-port) {
      padding: 0 2rem;
    }

    a.router-link-exact-active {
      text-decoration: underline;
    }

    &__menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include respond(tab-port) {
        position: fixed;
        left: -100%;
        top: 5rem;
        padding: 3rem 0;
        z-index: 1;
        flex-direction: column;
        background-color: $red;
        color: $white;
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
      }
      &-item {
        margin-top: 0.3rem;
        padding-top: 0.3rem;
        margin-right: 1rem;
        a {
          font-weight: bold;
          font-size: 1.4rem;
        }
        &:last-child {
          @include format-list;
          @include respond(tab-port) {
            margin-left: 0;
          }
        }
      }
      &.active {
        @include respond(tab-port) {
          left: 0;
        }
      }
    }
    &__menu-controller {
      display: none;
      @include respond(tab-port) {
        display: block;
        cursor: pointer;
      }
    }
  }
}
</style>
