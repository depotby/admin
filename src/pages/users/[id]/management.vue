<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.ts';
import UiFormSwitch from '@/components/ui/form/switch.vue';
import { AbilityName } from '@/types/models/ability.ts';
import { UserAccountType, type ExtendedListUser } from '@/types/models/user.ts';

const props = defineProps<{
  user: ExtendedListUser;
}>();

const emit = defineEmits<{
  switchAccountType: [value: void];
}>();

const userStore = useUserStore();

const isEmployee = computed(() => props.user.account_type === UserAccountType.employee);
const hasEditAbility = computed(() => userStore.hasAbility(AbilityName.USER_TYPE_UPDATE));
</script>

<template>
  <table :class="simple_table['simple-table']">
    <tbody>
      <tr>
        <td>{{ $t('pages.users.id.is_employee') }}</td>
        <td>
          <UiFormSwitch
            :model-value="isEmployee"
            label="test"
            :disabled="!hasEditAbility"
            @update:model-value="() => emit('switchAccountType')"
          />
        </td>
      </tr>
      <tr>
        <td>{{ $t('labels.roles') }}</td>
        <td>
          <pre>{{ props.user.roles }}</pre>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style module="simple_table" src="@/assets/styles/modules/simple-table.scss" />
