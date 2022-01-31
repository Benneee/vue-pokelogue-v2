<template>
  <section class="home">
    <div class="card">
      <h1>Welcome to Pokelogue</h1>

      <p>
        Find a collection of all Pokemons
        <router-link to="/pokemons">here</router-link>
      </p>

      <p>
        Find a collection of Pokemon By Types
        <router-link to="/poketypes">here</router-link>
      </p>

      <p>
        Find a collection of your Favourite Pokemons
        <router-link to="/favourites">here</router-link>
      </p>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.home {
  font-family: $primary-font;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('http://pngimg.com/uploads/pokemon/pokemon_PNG33.png');
  background-position: center;
  background-repeat: no-repeat;
}

.card {
  width: 50vw;
  text-align: center;
  height: 20vh;
  @include respond(tab-port) {
    height: unset;
  }
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(182, 11, 11, 0.2);
  transition: 0.3s;
  background-color: rgb(243, 235, 235);

  h1 {
    border-bottom: 3px solid rgb(206, 48, 48);
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  p a {
    color: rgb(206, 48, 48);
  }

  animation: drop 1.5s forwards;
}

@keyframes drop {
  0% {
    transform-origin: center;
    opacity: 0;
  }

  40% {
    transform: translate3d(0, -120px, 0) rotate3d(0, 0, 1, 10deg);
    opacity: 0.5;
  }

  100% {
    opacity: 1;
    transform: translateY(0);
    transform: translate3d(0);
  }
}

@include respond(tab-port) {
  .home {
    display: flex;
    flex-direction: column;
    background-image: url('http://pngimg.com/uploads/pokemon/pokemon_PNG33.png');
    background-position: center;
    background-repeat: no-repeat;
  }

  .card {
    width: 80vw;

    p {
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
    }

    h1 {
      font-size: 1rem;
    }
  }
}
</style>
