import type { RouteRecordRaw } from 'vue-router';
import { AbilityName } from '@/types/models/ability.ts';

const routes: RouteRecordRaw[] = [
  {
    path: '/products',
    name: 'products',
    component: () => import('@/pages/products/index.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.PRODUCT_READ,
    },
  },
  {
    path: '/products/:id',
    name: 'products-id',
    component: () => import('@/pages/products/[id]/index.vue'),
    meta: {
      layout: 'default',
      ability: AbilityName.PRODUCT_READ,
    },
  },
];

export default routes;
