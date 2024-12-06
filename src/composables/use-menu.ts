import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/user.ts';
import { AbilityName } from '@/types/models/ability.ts';
import type { MenuItem } from '@/types/composables/use-menu.ts';

export const useMenu = () => {
  const { t } = useI18n();
  const userStore = useUserStore();

  const menuItems: MenuItem[] = [
    {
      id: Symbol(),
      routeName: 'index',
      icon: 'dashboard-rounded',
      text: t('labels.dashboard'),
    },
    {
      id: Symbol(),
      routeName: 'users',
      ability: AbilityName.USER_READ,
      icon: 'supervised-user-circle',
      text: t('labels.users'),
    },
    {
      id: Symbol(),
      routeName: 'roles',
      ability: AbilityName.ROLE_READ,
      icon: 'enterprise',
      text: t('labels.roles'),
    },
    {
      id: Symbol(),
      routeName: 'categories',
      ability: AbilityName.CATEGORY_READ,
      icon: 'category-rounded',
      text: t('labels.categories'),
    },
  ];

  const menu = computed<MenuItem[]>(() =>
    menuItems.filter((item) => !item.ability || userStore.user?.abilities.includes(item.ability)),
  );

  return {
    menu,
  };
};
