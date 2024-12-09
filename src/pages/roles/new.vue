<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import UiFormInput from '@/components/ui/form/input.vue';
import UiButton from '@/components/ui/button.vue';
import type { RoleData } from '@/types/models/role.ts';

const router = useRouter();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const form = ref<RoleData['role']>({
  name: '',
});
const errors = ref<any>();

const createRole = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.roles.create({ role: form.value });
    await router.push({ name: 'roles-id', params: { id: data.id } });
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) {
      errors.value = e.response.data;
    }
  }
  loading.value = false;
};

useHead(() => ({
  title: t('pages.roles.new.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-roles-new']">
    <UiText variant="h3">
      {{ $t('pages.roles.new.title') }}
    </UiText>

    <form :class="$style['page-roles-new__form']" @submit.prevent="createRole">
      <UiFormInput
        v-model="form.name"
        :label="$t('pages.roles.new.form.name.label')"
        :placeholder="$t('pages.roles.new.form.name.placeholder')"
        :disabled="loading"
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
.page-roles-new {
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
