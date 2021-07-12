import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import ut from './utils/userUtils';
const app = createApp(App)
installElementPlus(app)
app.provide("$ut" , ut);
app
    .use(store)
    .use(router)
    .use(ut)
    .mount('#app');

    