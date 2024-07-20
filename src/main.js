import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVueNext } from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import { globalLoader } from 'vue-global-loader'


const app = createApp(App);
app.use(router);
app.use(BootstrapVueNext);
app.use(globalLoader, {
    backgroundOpacity: 0.5,
    transitionDuration: 0.2
})
app.mount('#app');
