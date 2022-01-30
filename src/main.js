import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import Notifications from '@kyvg/vue3-notification';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Notifications);

app.mount('#app');
