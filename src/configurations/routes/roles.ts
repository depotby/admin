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
  {
    path: '/roles/new',
    name: 'roles-new',
    component: () => import('@/pages/roles/new.vue'),
    meta: {
      layout: 'default',
    },
  },
  {
    path: '/roles/:id',
    name: 'roles-id',
    component: () => import('@/pages/roles/[id].vue'),
    meta: {
      layout: 'default',
    },
  },
];

export default routes;
