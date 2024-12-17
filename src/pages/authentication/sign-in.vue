<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { useUserStore } from '@/stores/user.ts';
import UiText from '@/components/ui/text.vue';
import UiFormInput from '@/components/ui/form/input.vue';
import UiButton from '@/components/ui/button.vue';

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const userStore = useUserStore();

const loading = ref(false);
const form = ref({
  email: '',
  password: '',
});
const error = ref('');

const handleFormSubmit = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    await userStore.createTokens(form.value);
    await userStore.loadUser();
    await router.push({ name: 'index' });
  } catch (e) {
    if (api.isAxiosError(e) && e.response?.status === 401) {
      error.value = e.response.data.message;
    }
  }
  loading.value = false;
};

watch(
  () => form.value,
  () => {
    if (error.value) error.value = '';
  },
  { deep: true },
);

useHead(() => ({
  title: t('pages.authentication.sign_in.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-authentication-sign-in']">
    <UiText variant="h1">
      {{ $t('pages.authentication.sign_in.title') }}
    </UiText>

    <form :class="$style['page-authentication-sign-in__form']" @submit.prevent="handleFormSubmit">
      <UiFormInput
        v-model="form.email"
        :label="$t('pages.authentication.sign_in.form.email.label')"
        :placeholder="$t('pages.authentication.sign_in.form.email.placeholder')"
        :disabled="loading"
        name="email"
        type="email"
        required
      />

      <UiFormInput
        v-model="form.password"
        :label="$t('pages.authentication.sign_in.form.password.label')"
        :placeholder="$t('pages.authentication.sign_in.form.password.placeholder')"
        :disabled="loading"
        :error
        name="password"
        type="password"
        required
      />

      <UiButton :loading size="large" :class="$style['page-authentication-sign-in__form__submit']">
        {{ $t('pages.authentication.sign_in.form.action') }}
      </UiButton>
    </form>
  </div>
</template>

<style module lang="scss">
.page-authentication-sign-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &__form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 400px;
    max-width: 100%;

    &__submit {
      margin-block-start: 0.5rem;
    }
  }
}
</style>
