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
    redirect: { name: 'categories-id-main' },
    meta: {
      layout: 'default',
      ability: AbilityName.CATEGORY_READ,
    },
    children: [
      {
        path: 'main',
        name: 'categories-id-main',
        component: () => import('@/pages/categories/[id]/main.vue'),
      },
      {
        path: 'properties',
        name: 'categories-id-properties',
        component: () => import('@/pages/categories/[id]/properties.vue'),
      },
    ],
  },
  {
    path: '/categories/:id/edit',
    name: 'categories-id-edit',
    component: () => import('@/pages/categories/[id]/edit.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.CATEGORY_UPDATE,
    },
  },
];

export default routes;
