<script setup lang="ts">
import { ref, computed, useCssModule } from 'vue';
import { useApi } from '@/composables/use-api.ts';
import { useUserStore } from '@/stores/user.ts';
import UiText from '@/components/ui/text.vue';
import UiFormInput from '@/components/ui/form/input.vue';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';
import { AbilityName } from '@/types/models/ability.ts';
import type { ListCategoryProperty } from '@/types/models/category-property.ts';
import type {
  CategoryPropertyOption,
  CategoryPropertyOptionData,
} from '@/types/models/category-property-option.ts';

const props = defineProps<{
  property: ListCategoryProperty;
  option?: CategoryPropertyOption;
}>();

const emits = defineEmits<{
  create: [value: CategoryPropertyOption];
  update: [value: CategoryPropertyOption];
  destroy: [value: void];
}>();

const styles = useCssModule();
const api = useApi();
const userStore = useUserStore();

const loading = ref(false);
const changing = ref(false);
const form = ref<CategoryPropertyOptionData['category_property_option']>({
  variant: '',
});
const errors = ref<any>();

const canEdit = computed(() => userStore.hasAbility(AbilityName.CATEGORY_UPDATE));
const isNewOption = computed(() => !props.option);
const classes = computed(() => ({
  [styles['page-categories-id-properties-option']]: true,
  [styles['page-categories-id-properties-option--active']]: isNewOption.value || changing.value,
}));

const switchChanging = () => {
  if (isNewOption.value) return emits('destroy');

  if (changing.value) {
    changing.value = false;
  } else {
    form.value = {
      variant: props.option?.variant || '',
    };
    changing.value = true;
  }
};

const handleSave = () => {
  if (isNewOption.value) {
    createOption();
  } else {
    updateOption();
  }
};

const createOption = async () => {
  if (loading.value) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.category_property_options.create(
      props.property.category_id,
      props.property.id,
      {
        category_property_option: form.value,
      },
    );

    emits('create', data);
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) {
      errors.value = e.response.data.fields;
    }
  }
  loading.value = false;
};

const updateOption = async () => {
  if (loading.value || !props.option) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.category_property_options.update(
      props.property.category_id,
      props.property.id,
      props.option.id,
      {
        category_property_option: form.value,
      },
    );

    emits('update', data);
    switchChanging();
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) {
      errors.value = e.response.data.fields;
    }
  }
  loading.value = false;
};

const deleteOption = async () => {
  if (loading.value || !props.option) return;

  loading.value = true;
  try {
    await api.category_property_options.destroy(
      props.property.category_id,
      props.property.id,
      props.option.id,
    );

    emits('destroy');
  } catch {}
  loading.value = false;
};
</script>

<template>
  <div :class="classes">
    <template v-if="changing || isNewOption">
      <UiFormInput
        v-model="form.variant"
        :disabled="loading"
        :error="errors?.variant"
        name="variant"
      />

      <UiButton
        :loading
        size="small-compact"
        variant="text"
        color="color-green"
        :class="$style['page-categories-id-properties-option__action']"
        @click="handleSave"
      >
        <UiIcon name="check-rounded" color="color-inherit" />
      </UiButton>

      <UiButton
        :disabled="loading"
        size="small-compact"
        variant="text"
        color="color-dark"
        :class="$style['page-categories-id-properties-option__action']"
        @click="switchChanging"
      >
        <UiIcon name="close-rounded" color="color-inherit" />
      </UiButton>
    </template>

    <template v-else>
      <UiText>
        {{ props.option?.variant }}
      </UiText>

      <template v-if="canEdit">
        <UiButton
          :disabled="loading"
          size="small-compact"
          variant="text"
          color="color-blue"
          :class="$style['page-categories-id-properties-option__action']"
          @click="switchChanging"
        >
          <UiIcon name="ink-pen-rounded" color="color-inherit" />
        </UiButton>

        <UiButton
          :loading
          size="small-compact"
          variant="text"
          color="color-red"
          :class="$style['page-categories-id-properties-option__action']"
          @click="deleteOption"
        >
          <UiIcon name="delete-rounded" color="color-inherit" />
        </UiButton>
      </template>
    </template>
  </div>
</template>

<style module lang="scss">
.page-categories-id-properties-option {
  $component-class: &;

  display: flex;
  gap: 0.375rem;

  &__action {
    transition: opacity $duration-fast ease-in-out;
  }

  &--active {
    align-items: flex-start;
  }

  @include media-query-desktop {
    &__action {
      opacity: 0;
    }

    &:hover,
    &--active {
      #{$component-class} {
        &__action {
          opacity: 1;
        }
      }
    }
  }
}
</style>
