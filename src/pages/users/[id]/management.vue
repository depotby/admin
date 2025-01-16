<script setup lang="ts">
import { ref, computed } from 'vue';
import { useApi } from '@/composables/use-api.ts';
import { useUserStore } from '@/stores/user.ts';
import UiFormSwitch from '@/components/ui/form/switch.vue';
import UiFormSelect, { type UiFormSelectItem } from '@/components/ui/form/select.vue';
import { AbilityName } from '@/types/models/ability.ts';
import { UserAccountType, type ExtendedListUser } from '@/types/models/user.ts';
import type { ListRole } from '@/types/models/role.ts';

const props = defineProps<{
  loading: boolean;
  user: ExtendedListUser;
}>();

const emit = defineEmits<{
  switchAccountType: [value: void];
  switchRole: [value: string];
}>();

const api = useApi();
const userStore = useUserStore();

const roles = ref<ListRole[]>([]);

const isEmployee = computed(() => props.user.account_type === UserAccountType.employee);
const activeRolesIds = computed(() => props.user.roles.map((role) => role.id));
const hasEditAbility = computed(() => userStore.hasAbility(AbilityName.USER_TYPE_UPDATE));
const hasRolesUpdateAbility = computed(() => userStore.hasAbility(AbilityName.USER_ROLES_UPDATE));
const formattedRoles = computed<UiFormSelectItem[]>(() =>
  roles.value.map((role) => ({
    name: role.name,
    value: role.id,
  })),
);

const loadRoles = async () => {
  try {
    const { data } = await api.roles.list();
    roles.value = data;
  } catch {}
};

loadRoles();
</script>

<template>
  <table :class="simple_table['simple-table']">
    <tbody>
      <tr>
        <td>{{ $t('pages.users.id.is_employee') }}</td>
        <td>
          <UiFormSwitch
            :model-value="isEmployee"
            :disabled="!hasEditAbility || props.loading"
            @update:model-value="() => emit('switchAccountType')"
          />
        </td>
      </tr>
      <tr>
        <td>{{ $t('labels.roles') }}</td>
        <td>
          <UiFormSelect
            :model-value="activeRolesIds"
            :items="formattedRoles"
            :loading="props.loading"
            :disabled="!hasRolesUpdateAbility"
            multiple
            @switch-selection="(event) => emit('switchRole', event)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style module="simple_table" src="@/assets/styles/modules/simple-table.scss" />
