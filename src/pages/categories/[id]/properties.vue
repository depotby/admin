<script setup lang="ts">
import { ref } from 'vue';
import { useApi } from '@/composables/use-api.ts';
import { useUuid } from '@/composables/use-uuid.ts';
import { useModal, ModalName } from '@/composables/use-modal.ts';
import UiIcon from '@/components/ui/icon.vue';
import UiButton from '@/components/ui/button.vue';
import PageCategoriesIdPropertiesProperty from '@/components/page/categories/id/properties/property.vue';
import PageCategoriesIdPropertiesNew from '@/components/page/categories/id/properties/new.vue';
import type { ListCategory } from '@/types/models/category.ts';
import type { ListCategoryProperty } from '@/types/models/category-property.ts';

const props = defineProps<{ category: ListCategory }>();

const api = useApi();
const { open } = useModal();

const loading = ref(false);
const properties = ref<ListCategoryProperty[]>([]);
const new_properties = ref<string[]>([]);

const loadProperties = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.category_properties.list(props.category.id);
    properties.value = data;
  } catch {}
  loading.value = false;
};

const updateProperty = (property: ListCategoryProperty) => {
  const index = properties.value.findIndex((cp) => cp.id === property.id);

  if (index > -1) properties.value.splice(index, 1, property);
};

const deleteProperty = async (property: ListCategoryProperty) => {
  open(ModalName.DELETE_CATEGORY_PROPERTY, {
    categoryProperty: property,
    callback: loadProperties,
  });
};

const addNewProperty = () => {
  new_properties.value.push(useUuid());
};

const createNewProperty = (id: string, property: ListCategoryProperty) => {
  deleteNewProperty(id);
  properties.value.push(property);
};

const deleteNewProperty = (removableId: string) => {
  const index = new_properties.value.findIndex((id) => id === removableId);

  if (index > -1) new_properties.value.splice(index, 1);
};

loadProperties();
</script>

<template>
  <div :class="$style['page-categories-id-properties']">
    <PageCategoriesIdPropertiesProperty
      v-for="property in properties"
      :key="property.id"
      :property
      @update="updateProperty"
      @destroy="() => deleteProperty(property)"
    />

    <PageCategoriesIdPropertiesNew
      v-for="id in new_properties"
      :key="id"
      :category-id="props.category.id"
      @create="(event) => createNewProperty(id, event)"
      @destroy="() => deleteNewProperty(id)"
    />

    <UiButton
      :disabled="loading"
      color="color-green"
      :class="$style['page-categories-id-properties__add-property']"
      @click="addNewProperty"
    >
      <UiIcon name="add-circle-outline-rounded" color="color-inherit" size="1.5em" />

      {{ $t('pages.categories.id.add_property') }}
    </UiButton>
  </div>
</template>

<style module="simple_table" src="@/assets/styles/modules/simple-table.scss" />

<style module lang="scss">
.page-categories-id-properties {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__add-property {
    position: fixed;
    inset-block-end: 1rem;
    inset-inline-end: 1rem;
    gap: 0.5rem;
  }
}
</style>
