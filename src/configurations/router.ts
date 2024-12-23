import { createRouter, createWebHistory } from 'vue-router';
import authentication from '@/configurations/routes/authentication.ts';
import categories from '@/configurations/routes/categories.ts';
import dashboard from '@/configurations/routes/dashboard.ts';
import roles from '@/configurations/routes/roles.ts';
import users from '@/configurations/routes/users.ts';
import { useUserStore } from '@/stores/user.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authentication,
    ...categories,
    ...dashboard,
    ...roles,
    ...users,
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

  if (to.meta.ability && !userStore.hasAbility(to.meta.ability)) {
    return {
      name: 'index',
    };
  }
});

export default router;
