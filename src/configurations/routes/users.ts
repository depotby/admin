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
  {
    path: '/users/:id',
    name: 'users-id',
    component: () => import('@/pages/users/[id].vue'),
    meta: {
      layout: 'default',
    },
  },
];

export default routes;
