<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import Tabs, { type Tab } from '@/components/tabs/index.vue';
import type { ExtendedListUser } from '@/types/models/user.ts';

const route = useRoute();
const { t } = useI18n();
const api = useApi();

const loading = ref(false);
const user = ref<ExtendedListUser>();

const userId = computed(() => route.params.id as string);
const firstAndLastNames = computed(() =>
  user.value ? [user.value.first_name, user.value.last_name].join(' ') : undefined,
);
const tabs = computed<Tab[]>(() => [
  {
    name: 'main',
    title: t('pages.users.id.tabs.main'),
    to: { name: 'users-id-main', params: { id: userId.value } },
  },
  {
    name: 'management',
    title: t('pages.users.id.tabs.management'),
    to: { name: 'users-id-management', params: { id: userId.value } },
  },
]);

const loadUser = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.users.one(userId.value);
    user.value = data;
  } catch {}
  loading.value = false;
};

const switchAccountType = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.users.switch_type(userId.value);
    user.value = data;
  } catch {}
  loading.value = false;
};

const switchRole = async (id: string) => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.users.switch_role(userId.value, id);
    user.value = data;
  } catch {}
  loading.value = false;
};

loadUser();

useHead(() => ({
  title: firstAndLastNames.value,
}));
</script>

<template>
  <div :class="$style['page-user-id']">
    <UiText variant="h3">
      {{ firstAndLastNames }}
    </UiText>

    <Tabs v-if="user" :tabs pages>
      <RouterView
        :loading
        :user
        @switch-account-type="switchAccountType"
        @switch-role="switchRole"
      />
    </Tabs>
  </div>
</template>

<style module lang="scss">
.page-user-id {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
