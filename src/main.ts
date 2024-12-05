import { createApp } from 'vue';

import App from './app.vue';
import pinia from './configurations/pinia.ts';
import router from './configurations/router.ts';
import i18n from '@/configurations/i18n.ts';
import unhead from '@/configurations/unhead.ts';
import { useUserStore } from '@/stores/user.ts';

const app = createApp(App);

app.use(pinia);

useUserStore()
  .autologin()
  .finally(() => app.use(router).use(i18n).use(unhead).mount('#app'));
