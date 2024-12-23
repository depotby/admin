<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import UiFormInput from '@/components/ui/form/input.vue';
import type { ExtendedListRole, RoleData } from '@/types/models/role.ts';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const role = ref<ExtendedListRole>();
const form = ref<RoleData['role']>({
  name: '',
});
const errors = ref<any>();

const roleId = computed(() => route.params.id as string);
const title = computed(() => t('pages.roles.id.edit.title', { name: role.value?.name }));

const loadRole = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.roles.one(roleId.value);
    role.value = data;

    form.value = {
      name: data.name,
    };
  } catch {}
  loading.value = false;
};

const updateRole = async () => {
  if (loading.value) return;

  errors.value = undefined;
  loading.value = true;
  try {
    const { data } = await api.roles.update(roleId.value, { role: form.value });
    await router.push({ name: 'roles-id', params: { id: data.id } });
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 422) {
      errors.value = e.response.data.fields;
    }
  }
  loading.value = false;
};

loadRole();

useHead(() => ({
  title: role.value ? t('pages.roles.id.edit.meta.title', { name: role.value.name }) : undefined,
}));
</script>

<template>
  <div :class="$style['page-roles-id-edit']">
    <UiText variant="h4">
      {{ title }}
    </UiText>

    <form :class="$style['page-roles-id-edit__form']" @submit.prevent="updateRole">
      <UiFormInput
        v-model="form.name"
        :label="$t('pages.roles.new.form.name.label')"
        :placeholder="$t('pages.roles.new.form.name.placeholder')"
        :disabled="loading"
        :error="errors?.name"
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
.page-roles-id-edit {
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
