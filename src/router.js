import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Favourites from './pages/Favourites.vue';
import NotFound from './pages/NotFound.vue';
import Pokemons from './pages/Pokemons.vue';
import Poketypes from './pages/Poketypes.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '', redirect: 'home' },
        { path: '/home', component: Home },
        { path: '/favourites', component: Favourites },
        { path: '/pokemons', component: Pokemons },
        { path: '/poketypes', component: Poketypes },
        { path: '/:notFound(.*)', component: NotFound },
    ]
})

export default router;