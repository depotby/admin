<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '@/composables/use-api.ts';
import { useModal } from '@/composables/use-modal.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import type { ExtendedListRole } from '@/types/models/role.ts';

const props = defineProps<{ role: ExtendedListRole }>();

const router = useRouter();
const api = useApi();
const { close } = useModal();

const loading = ref(false);

const deleteRole = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await api.roles.destroy(props.role.id);
    close();
    await router.push({ name: 'roles' });
  } catch {}
  loading.value = false;
};
</script>

<template>
  <div :class="$style['modal-delete-role']">
    <UiText align="center">
      <span v-html="$t('modals.delete_role.text', { name: props.role.name })" />
    </UiText>

    <UiButton :loading size="large" color="color-red" @click="deleteRole">
      {{ $t('actions.delete') }}
    </UiButton>
  </div>
</template>

<style module lang="scss">
.modal-delete-role {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
