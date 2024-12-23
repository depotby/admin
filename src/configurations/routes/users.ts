import type { RouteRecordRaw } from 'vue-router';
import { AbilityName } from '@/types/models/ability.ts';

const routes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/pages/users/index.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.USER_READ,
    },
  },
  {
    path: '/users/:id',
    name: 'users-id',
    component: () => import('@/pages/users/[id].vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.USER_READ,
    },
  },
];

export default routes;
