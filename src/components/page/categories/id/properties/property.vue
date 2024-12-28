<script setup lang="ts">
import { ref, computed, useCssModule } from 'vue';
import { useUuid } from '@/composables/use-uuid.ts';
import { useApi } from '@/composables/use-api.ts';
import PageCategoriesIdPropertiesOption from '@/components/page/categories/id/properties/option.vue';
import UiText from '@/components/ui/text.vue';
import UiFormInput from '@/components/ui/form/input.vue';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';
import type {
  CategoryPropertyData,
  ListCategoryProperty,
} from '@/types/models/category-property.ts';
import type { CategoryPropertyOption } from '@/types/models/category-property-option.ts';

const props = defineProps<{ property: ListCategoryProperty }>();
const emits = defineEmits<{
  update: [value: ListCategoryProperty];
  destroy: [value: void];
}>();

const styles = useCssModule();
const api = useApi();

const changing = ref(false);
const loading = ref(false);
const new_property_data = ref<CategoryPropertyData['category_property']>({
  name: '',
  uri_name: '',
});
const errors = ref<any>();
const new_property_options = ref<string[]>([]);

const componentClasses = computed(() => ({
  [styles['page-categories-id-properties-property']]: true,
  [styles['page-categories-id-properties-property--active']]: changing.value,
}));

const switchChanging = () => {
  changing.value = !changing.value;

  if (changing.value)
    new_property_data.value = {
      name: props.property.name,
      uri_name: props.property.uri_name,
    };
};

const saveChanges = async () => {
  if (loading.value) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.category_properties.update(
      props.property.category_id,
      props.property.id,
      {
        category_property: new_property_data.value,
      },
    );

    emits('update', data);

    changing.value = false;
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) {
      errors.value = e.response.data.fields;
    }
  }
  loading.value = false;
};

const deleteProperty = () => {
  emits('destroy');
};

const addNewOption = () => {
  new_property_options.value.push(useUuid());
};

const createOption = (id: string, createdOption: CategoryPropertyOption) => {
  deleteNewOption(id);

  emits('update', {
    ...props.property,
    options: [...props.property.options, createdOption],
  });
};

const deleteNewOption = (id: string) => {
  const index = new_property_options.value.findIndex((item) => item === id);
  if (index > -1) new_property_options.value.splice(index, 1);
};

const updateOption = (id: string, updatedOption: CategoryPropertyOption) => {
  emits('update', {
    ...props.property,
    options: [...props.property.options.filter((option) => option.id !== id), updatedOption],
  });
};

const deleteOption = (id: string) => {
  emits('update', {
    ...props.property,
    options: props.property.options.filter((option) => option.id !== id),
  });
};
</script>

<template>
  <div :class="componentClasses">
    <div :class="$style['page-categories-id-properties-property__actions']">
      <template v-if="changing">
        <UiButton
          v-if="changing"
          :disabled="loading"
          size="medium-compact"
          variant="text"
          color="color-green"
          @click="saveChanges"
        >
          <UiIcon name="check-rounded" color="color-inherit" size="1.5em" />
        </UiButton>

        <UiButton
          :disabled="loading"
          color="color-dark"
          size="medium-compact"
          variant="text"
          @click="switchChanging"
        >
          <UiIcon name="forward-media-rounded" color="color-inherit" size="1.5em" />
        </UiButton>
      </template>

      <template v-else>
        <UiButton
          :disabled="loading"
          color="color-blue"
          size="medium-compact"
          variant="text"
          @click="switchChanging"
        >
          <UiIcon name="ink-pen-rounded" color="color-inherit" size="1.5em" />
        </UiButton>

        <UiButton
          :disabled="loading"
          color="color-dark"
          size="medium-compact"
          variant="text"
          @click="addNewOption"
        >
          <UiIcon name="add-notes-rounded" color="color-inherit" size="1.5em" />
        </UiButton>

        <UiButton
          :disabled="loading"
          size="medium-compact"
          variant="text"
          color="color-red"
          @click="deleteProperty"
        >
          <UiIcon name="delete-rounded" color="color-inherit" size="1.5em" />
        </UiButton>
      </template>
    </div>

    <div :class="$style['page-categories-id-properties-property__name']">
      <UiText font-weight="600">{{ $t('labels.name') }}</UiText>

      <UiFormInput
        v-if="changing"
        v-model="new_property_data.name"
        name="name"
        :disabled="loading"
        :error="errors?.name"
      />

      <UiText v-else>{{ props.property.name }}</UiText>
    </div>

    <div :class="$style['page-categories-id-properties-property__uri']">
      <UiText font-weight="600">{{ $t('labels.uri_name') }}</UiText>

      <UiFormInput
        v-if="changing"
        v-model="new_property_data.uri_name"
        name="uri_name"
        :disabled="loading"
        :error="errors?.uri_name"
      />

      <UiText v-else>{{ props.property.uri_name }}</UiText>
    </div>

    <div :class="$style['page-categories-id-properties-property__variants']">
      <UiText font-weight="600">{{ $t('labels.variants') }}</UiText>

      <ul :class="$style['page-categories-id-properties-property__variants__list']">
        <li v-for="option in props.property.options" :key="option.id">
          <PageCategoriesIdPropertiesOption
            :property="props.property"
            :option
            @update="(event) => updateOption(option.id, event)"
            @destroy="() => deleteOption(option.id)"
          />
        </li>

        <li v-for="id in new_property_options" :key="id">
          <PageCategoriesIdPropertiesOption
            :property="props.property"
            @create="(event) => createOption(id, event)"
            @destroy="() => deleteNewOption(id)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style module lang="scss">
.page-categories-id-properties-property {
  $component-class: &;

  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid $color-border;
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 1rem;

  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0.25rem;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  &__name,
  &__uri,
  &__variants {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__name {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  &__uri {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }

  &__variants {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
  }

  @include media-query-desktop {
    grid-template-columns: 1fr 1fr min-content;

    &__actions {
      grid-column: 3 / 4;
      grid-row: 1 / 2;
      opacity: 0;
      transition: opacity $duration-fast ease-in-out;
    }

    &__name {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    &__uri {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    &__variants {
      grid-column: 1 / 4;
      grid-row: 2 / 3;
    }

    &--active,
    &:hover {
      #{$component-class} {
        &__actions {
          opacity: 1;
        }
      }
    }
  }
}
</style>
