import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/pages/users/index.vue'),
    meta: {
      layout: 'default',
    },
  },
];

export default routes;
