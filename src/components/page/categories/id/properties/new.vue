<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '@/composables/use-api.ts';
import UiFormInput from '@/components/ui/form/input.vue';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';
import type {
  CategoryPropertyData,
  ListCategoryProperty,
} from '@/types/models/category-property.ts';

const props = defineProps<{
  categoryId: string;
}>();

const emits = defineEmits<{
  create: [value: ListCategoryProperty];
  destroy: [value: void];
}>();

const api = useApi();

const loading = ref(false);
const form = ref<CategoryPropertyData['category_property']>({
  name: '',
  uri_name: '',
});
const errors = ref<any>();

const createCategoryProperty = async () => {
  if (loading.value) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.category_properties.create(props.categoryId, {
      category_property: form.value,
    });
    emits('create', data);
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) {
      errors.value = e.response.data.fields;
    }
  }
  loading.value = false;
};

const cancelCreation = () => {
  if (loading.value) return;
  emits('destroy');
};
</script>

<template>
  <div :class="$style['page-categories-id-properties-new']">
    <UiFormInput
      v-model="form.name"
      :label="$t('labels.name')"
      :error="errors?.name"
      :disabled="loading"
      name="name"
      :class="$style['page-categories-id-properties-new__name']"
    />

    <UiFormInput
      v-model="form.uri_name"
      :label="$t('labels.uri_name')"
      :error="errors?.uri_name"
      :disabled="loading"
      name="uri_name"
      :class="$style['page-categories-id-properties-new__uri']"
    />

    <div :class="$style['page-categories-id-properties-new__actions']">
      <UiButton
        :loading
        variant="text"
        size="medium-compact"
        color="color-green"
        @click="createCategoryProperty"
      >
        <UiIcon name="save-rounded" color="color-inherit" />
      </UiButton>

      <UiButton variant="text" size="medium-compact" color="color-dark" @click="cancelCreation">
        <UiIcon name="close-rounded" color="color-inherit" />
      </UiButton>
    </div>
  </div>
</template>

<style module lang="scss">
.page-categories-id-properties-new {
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid $color-green;
  display: grid;
  gap: 1rem;

  &__actions {
    display: flex;
    align-items: flex-end;
    gap: 0.25rem;
  }

  @include media-query-desktop {
    grid-template-columns: 1fr 1fr min-content;

    &__name {
      grid-column: 1 / 2;
    }

    &__uri {
      grid-column: 2 / 3;
    }

    &__actions {
      grid-column: 3 / 4;
    }
  }
}
</style>
