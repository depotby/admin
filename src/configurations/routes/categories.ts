import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/pages/categories/index.vue'),
    meta: {
      layout: 'default',
    },
  },
];

export default routes;
