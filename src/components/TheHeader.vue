<template>
  <header class="nav__container">
    <div class="header">
      <div class="header__logo">
        <router-link to="/">
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
          <router-link to="/favourites">Favourites</router-link>
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
export default {
  name: 'TheHeader',

  data() {
    return {
      dropdownOpen: false,
    };
  },

  computed: {
    dropdownIcon() {
      return this.dropdownOpen ? 'close' : 'menu';
    },
  },
};
</script>

<style scoped lang="scss">
.nav__container {
  @include set-container;
  font-family: $primary-font;
  padding: 1.2rem 0 0rem 0;

  @include respond(tab-port) {
    padding: 1rem 0 1rem 0;
  }

  .header {
    @include set-width(4rem);
    @include respond(tab-port) {
      padding: 0 1rem;
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
        top: 6rem;
        padding: 1.5rem 0;
        z-index: 1;
        flex-direction: column;
        background-color: $red;
        color: $white;
        width: 100%;
        text-align: center;
        transition: 0.5s all;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);

        animation: slideIn 0.2s ease-out forwards;
      }

      &-item {
        @include respond(tab-port) {
          margin-top: 1rem;
        }
        a {
          font-size: 1.3rem;
          margin-right: 1rem;
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

  @keyframes slideIn {
    0% {
      opacity: 0;
      left: -200px;
    }

    50% {
      left: -50px;
      opacity: 0.7;
    }

    100% {
      opacity: 1;
      left: 0;
    }
  }
}
</style>
