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
    component: () => import('@/pages/users/[id]/index.vue'),
    redirect: { name: 'users-id-main' },
    meta: {
      layout: 'default',
      ability: AbilityName.USER_READ,
    },
    children: [
      {
        path: 'main',
        name: 'users-id-main',
        component: () => import('@/pages/users/[id]/main.vue'),
      },
      {
        path: 'management',
        name: 'users-id-management',
        component: () => import('@/pages/users/[id]/management.vue'),
      },
    ],
  },
];

export default routes;
