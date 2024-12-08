<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import UiText from '@/components/ui/text.vue';
import type { ExtendedListUser } from '@/types/models/user.ts';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const user = ref<ExtendedListUser>();

const userId = computed(() => route.params.id as string);
const firstAndLastNames = computed(() =>
  user.value ? [user.value.first_name, user.value.last_name].join(' ') : undefined,
);

const loadUser = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.users.one(userId.value);
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
  </div>
</template>

<style module lang="scss">
.page-user-id {
}
</style>
