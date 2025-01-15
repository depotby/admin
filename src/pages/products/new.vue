<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import UiFormInput from '@/components/ui/form/input.vue';
import UiButton from '@/components/ui/button.vue';
import type { ProductData } from '@/types/models/product.ts';

const router = useRouter();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const form = ref<ProductData['product']>({
  category_id: '',
  name: '',
  uri_name: '',
});
const errors = ref<any>();

const createProduct = async () => {
  if (loading.value) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.products.create({ product: form.value });
    await router.push({ name: 'products-id', params: { id: data.id } });
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) {
      errors.value = e.response.data.fields;
    }
  }
  loading.value = false;
};

useHead(() => ({
  title: t('pages.products.new.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-products-new']">
    <UiText variant="h3">
      {{ $t('pages.products.new.title') }}
    </UiText>

    <form :class="$style['page-products-new__form']" @submit.prevent="createProduct">
      <UiFormInput
        v-model="form.category_id"
        :label="$t('pages.products.new.form.category_id.label')"
        :error="errors?.category"
        :disabled="loading"
        name="name"
        required
      />

      <UiFormInput
        v-model="form.name"
        :label="$t('pages.products.new.form.name.label')"
        :placeholder="$t('pages.products.new.form.name.placeholder')"
        :error="errors?.name"
        :disabled="loading"
        name="name"
        required
      />

      <UiFormInput
        v-model="form.uri_name"
        :label="$t('pages.products.new.form.uri_name.label')"
        :placeholder="$t('pages.products.new.form.uri_name.placeholder')"
        :error="errors?.uri_name"
        :disabled="loading"
        name="uri_name"
        required
      />

      <UiButton :loading type="submit">
        {{ $t('actions.save') }}
      </UiButton>
    </form>
  </div>
</template>

<style module lang="scss">
.page-products-new {
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
