import { AbilityName } from '@/types/models/ability.ts';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/roles',
    name: 'roles',
    component: () => import('@/pages/roles/index.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.ROLE_READ,
    },
  },
  {
    path: '/roles/new',
    name: 'roles-new',
    component: () => import('@/pages/roles/new.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.ROLE_CREATE,
    },
  },
  {
    path: '/roles/:id',
    name: 'roles-id',
    component: () => import('@/pages/roles/[id]/index.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.ROLE_READ,
    },
  },
  {
    path: '/roles/:id/edit',
    name: 'roles-id-edit',
    component: () => import('@/pages/roles/[id]/edit.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.ROLE_UPDATE,
    },
  },
];

export default routes;
