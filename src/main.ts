import { createApp } from 'vue';

import App from './app.vue';
import pinia from './configurations/pinia';
import router from './configurations/router';
import i18n from '@/configurations/i18n.ts';

const app = createApp(App);

app.use(pinia).use(router).use(i18n).mount('#app');
