import { createApp } from 'vue'
import App from './App.vue'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import router from './router/routes';
import store from './store/index';

const app =createApp(App);
app.use(Buefy);
app.use(store);
app.use(router);
app.mount('#app');
