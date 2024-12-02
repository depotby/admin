import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/authentication',
    redirect: { name: 'authentication-sign-in' },
  },
  {
    path: '/authentication/sign-in',
    name: 'authentication-sign-in',
    component: () => import('@/pages/authentication/sign-in.vue'),
    meta: {
      layout: 'authentication',
      authentication: true,
    },
  },
];

export default routes;
