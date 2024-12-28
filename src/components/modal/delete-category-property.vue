<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '@/composables/use-api.ts';
import { useModal } from '@/composables/use-modal.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import type { ListCategoryProperty } from '@/types/models/category-property.ts';

const props = defineProps<{
  categoryProperty: ListCategoryProperty;
  callback: () => Promise<void>;
}>();

const api = useApi();
const { close } = useModal();

const loading = ref(false);

const deleteCategoryProperty = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await api.category_properties.destroy(
      props.categoryProperty.category_id,
      props.categoryProperty.id,
    );
    props.callback();
    close();
  } catch {}
  loading.value = false;
};
</script>

<template>
  <div :class="$style['modal-delete-category-property']">
    <UiText align="center">
      <span
        v-html="$t('modals.delete_category_property.text', { name: props.categoryProperty.name })"
      />
    </UiText>

    <UiButton :loading size="large" color="color-red" @click="deleteCategoryProperty">
      {{ $t('actions.delete') }}
    </UiButton>
  </div>
</template>

<style module lang="scss">
.modal-delete-category-property {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
