import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/pages/roles/index.vue'),
    meta: {
      layout: 'default',
    },
  },
];

export default routes;
