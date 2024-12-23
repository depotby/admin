<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '@/composables/use-api.ts';
import { useModal } from '@/composables/use-modal.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import type { ListCategory } from '@/types/models/category.ts';

const props = defineProps<{ category: ListCategory }>();

const router = useRouter();
const api = useApi();
const { close } = useModal();

const loading = ref(false);

const deleteCategory = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await api.categories.destroy(props.category.id);
    close();
    await router.replace({ name: 'categories' });
  } catch {}
  loading.value = false;
};
</script>

<template>
  <div :class="$style['modal-delete-category']">
    <UiText align="center">
      <span v-html="$t('modals.delete_category.text', { name: props.category.name })" />
    </UiText>

    <UiButton :loading size="large" color="color-red" @click="deleteCategory">
      {{ $t('actions.delete') }}
    </UiButton>
  </div>
</template>

<style module lang="scss">
.modal-delete-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
