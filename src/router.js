import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      redirect: 'home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('./pages/Favourites.vue'),
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: () => import('./pages/Pokemons.vue'),
    },
    {
      path: '/poketypes',
      name: 'poketypes',
      component: () => import('./pages/Poketypes.vue'),
    },
    {
      path: '/pokemon/:pokemonId',
      name: 'pokemon-detail',
      component: () => import('./pages/PokemonDetail.vue'),
      props: true,
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top };
  },
});

export default router;
