<template>
  <article class="pokemon__card">
    <div class="pokemon__card-img">
      <img src="@/assets/images/poke-img.png" alt="" />
    </div>
    <div class="pokemon__card-details">
      <p class="id">#002</p>

      <p class="name">Ivysaur</p>

      <p class="properties">Grass, Poison</p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Pokemon',
};
</script>

<style lang="scss">
.pokemon__card {
  height: 225px;
  width: 160px;
  background: $white;
  border-radius: 4px;
  font-family: $primary-font;
  border: 1px solid $white;

  &-img {
    background: #f3f9ef;
    display: flex;
    align-items: center;
    justify-content: center;
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
      font-size: 1.75rem;
      font-weight: bold;
    }

    .properties {
      font-size: 1rem;
      color: $muted;
      font-weight: 300;
    }
  }
}
</style>
