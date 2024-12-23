import { AbilityName } from '@/types/models/ability.ts';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/pages/categories/index.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.CATEGORY_READ,
    },
  },
  {
    path: '/categories/new',
    name: 'categories-new',
    component: () => import('@/pages/categories/new.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.CATEGORY_CREATE,
    },
  },
  {
    path: '/categories/:id',
    name: 'categories-id',
    component: () => import('@/pages/categories/[id]/index.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.CATEGORY_READ,
    },
  },
];

export default routes;
