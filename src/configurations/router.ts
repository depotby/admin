import { createRouter, createWebHistory } from 'vue-router';
import authentication from '@/configurations/routes/authentication.ts';
import dashboard from '@/configurations/routes/dashboard.ts';
import { useUserStore } from '@/stores/user.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authentication,
    ...dashboard,
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'index' },
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.authentication && userStore.isAuthorized) {
    return {
      name: 'index',
    };
  } else if (!to.meta.authentication && !userStore.isAuthorized) {
    return {
      name: 'authentication-sign-in',
    };
  }
});

export default router;
