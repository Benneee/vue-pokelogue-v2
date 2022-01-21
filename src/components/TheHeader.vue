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
  // background: rgb(2, 0, 36);
  // background: linear-gradient(
  //   90deg,
  //   rgba(255, 249, 0, 1) 40%,
  //   rgba(2, 0, 36, 1) 30%,
  //   rgba(163, 27, 27, 1) 29%
  // );
  // @include set-container;
  // background: transparent;
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
      // color: $white;

      @include respond(tab-port) {
        position: fixed;
        left: -100%;
        top: 5rem;
        padding: 4rem 0;
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
        @include respond(tab-port) {
          margin-top: 1rem;
        }
        a {
          // font-weight: bold;
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
}
</style>
