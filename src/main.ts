import { createApp } from 'vue';

import App from './app.vue';
import pinia from './configurations/pinia';
import router from './configurations/router';

const app = createApp(App);

app.use(pinia).use(router).mount('#app');
