import { computed, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { AbilityName, AbilityType } from '@/types/models/ability.ts';
import type { ExtendedListRole } from '@/types/models/role.ts';
import type { Icon } from '@/types/assets/icons.ts';

interface RoleGroup {
  name: string;
  text: string;
  abilities: { name: AbilityType; key: AbilityName; icon: Icon; active: boolean }[];
  subGroups: Omit<RoleGroup, 'subGroups'>[];
}

const icons: Record<AbilityType, Icon> = {
  create: 'add-2-rounded',
  read: 'eye-tracking-rounded',
  update: 'ink-pen-rounded',
  delete: 'delete-rounded',
};

export const useRole = (role: Ref<ExtendedListRole | undefined>) => {
  const { t } = useI18n();

  const abilitiesGroups = computed(() =>
    [
      {
        name: 'user',
        text: t('labels.users'),
        abilities: [
          {
            name: AbilityType.READ,
            key: AbilityName.USER_READ,
          },
          {
            name: AbilityType.UPDATE,
            key: AbilityName.USER_UPDATE,
          },
        ],
        subGroups: [
          {
            name: 'user_type',
            text: t('labels.type'),
            abilities: [
              {
                name: AbilityType.UPDATE,
                key: AbilityName.USER_TYPE_UPDATE,
              },
            ],
          },
        ],
      },
      {
        name: 'role',
        text: t('labels.roles'),
        abilities: [
          {
            name: AbilityType.CREATE,
            key: AbilityName.ROLE_CREATE,
          },
          {
            name: AbilityType.READ,
            key: AbilityName.ROLE_READ,
          },
          {
            name: AbilityType.UPDATE,
            key: AbilityName.ROLE_UPDATE,
          },
          {
            name: AbilityType.DELETE,
            key: AbilityName.ROLE_DELETE,
          },
        ],
        subGroups: [],
      },
      {
        name: 'category',
        text: t('labels.categories'),
        abilities: [
          {
            name: AbilityType.CREATE,
            key: AbilityName.CATEGORY_CREATE,
          },
          {
            name: AbilityType.READ,
            key: AbilityName.CATEGORY_READ,
          },
          {
            name: AbilityType.UPDATE,
            key: AbilityName.CATEGORY_UPDATE,
          },
          {
            name: AbilityType.DELETE,
            key: AbilityName.CATEGORY_DELETE,
          },
        ],
        subGroups: [],
      },
    ].map(
      (group): RoleGroup => ({
        ...group,
        abilities: group.abilities.map((ability) => ({
          ...ability,
          icon: icons[ability.name],
          active: role.value?.abilities.includes(ability.key) ?? false,
        })),
        subGroups: group.subGroups.map((subGroup) => ({
          ...subGroup,
          abilities: subGroup.abilities.map((ability) => ({
            ...ability,
            icon: icons[ability.name],
            active: role.value?.abilities.includes(ability.key) ?? false,
          })),
        })),
      }),
    ),
  );

  return {
    abilitiesGroups,
  };
};
