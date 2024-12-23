<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import UiFormInput from '@/components/ui/form/input.vue';
import type { CategoryData, ListCategory } from '@/types/models/category.ts';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const category = ref<ListCategory>();
const form = ref<CategoryData['category']>({
  name: '',
  uri_name: '',
});
const errors = ref<any>();

const categoryId = computed(() => route.params.id as string);
const title = computed(() => t('pages.categories.id.edit.title', { name: category.value?.name }));

const loadCategory = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.categories.one(categoryId.value);
    category.value = data;

    form.value = {
      name: data.name,
      uri_name: data.uri_name,
    };
  } catch {}
  loading.value = false;
};

const updateCategory = async () => {
  if (loading.value) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.categories.update(categoryId.value, { category: form.value });
    await router.push({ name: 'categories-id', params: { id: data.id } });
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) {
      errors.value = e.response.data.fields;
    }
  }
  loading.value = false;
};

loadCategory();

useHead(() => ({
  title: category.value
    ? t('pages.categories.id.edit.meta.title', { name: category.value.name })
    : undefined,
}));
</script>

<template>
  <div :class="$style['page-categories-id-edit']">
    <UiText variant="h4">
      {{ title }}
    </UiText>

    <form :class="$style['page-categories-id-edit__form']" @submit.prevent="updateCategory">
      <UiFormInput
        v-model="form.name"
        :label="$t('pages.categories.new.form.name.label')"
        :placeholder="$t('pages.categories.new.form.name.placeholder')"
        :disabled="loading"
        :error="errors?.name"
        name="name"
        required
      />

      <UiFormInput
        v-model="form.uri_name"
        :label="$t('pages.categories.new.form.uri_name.label')"
        :placeholder="$t('pages.categories.new.form.uri_name.placeholder')"
        :disabled="loading"
        :error="errors?.uri_name"
        name="name"
        required
      />

      <UiButton :loading type="submit">
        {{ $t('actions.save') }}
      </UiButton>
    </form>
  </div>
</template>

<style module lang="scss">
.page-categories-id-edit {
  &,
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__form {
    max-width: 500px;
  }
}
</style>
