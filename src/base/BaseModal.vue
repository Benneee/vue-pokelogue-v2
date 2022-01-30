<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>

          <span v-if="fixed" @click="closeModal">x</span>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <button class="btn" @click="tryClose">Close</button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },

    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  font-family: $primary-font;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}
header {
  background-color: $red;
  color: white;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  h2 {
    margin: 0;
  }
}
section {
  padding: 1rem;
}

span {
  cursor: pointer;
}
menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.btn {
  font-size: 1.3rem;
  padding: 0.5rem 0.7rem;
  border-radius: 20px;
  background: $red;
  color: $white;
  font-family: $primary-font;
  border: none;
  cursor: pointer;
  width: 7rem;
  text-align: center;
  text-transform: capitalize;

  @include respond(tab-port) {
    padding: 0.5rem 0.7rem;
    border-radius: 20px;
    width: 4.5rem;
    font-size: 0.9rem;
  }
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 30rem;
  }
}
</style>
