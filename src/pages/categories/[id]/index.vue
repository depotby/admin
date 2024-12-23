<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { useModal, ModalName } from '@/composables/use-modal.ts';
import { useUserStore } from '@/stores/user.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';
import { AbilityName } from '@/types/models/ability.ts';
import type { ListCategory } from '@/types/models/category.ts';

const route = useRoute();
const router = useRouter();
const api = useApi();
const { open } = useModal();
const userStore = useUserStore();

const loading = ref(false);
const category = ref<ListCategory>();

const categoryId = computed(() => category.value?.id ?? (route.params.id as string));
const canEdit = computed(() => userStore.hasAbility(AbilityName.CATEGORY_UPDATE));
const canDelete = computed(() => userStore.hasAbility(AbilityName.CATEGORY_DELETE));
const editPath = computed(() =>
  category.value
    ? router.resolve({ name: 'categories-id-edit', params: { id: category.value.id } })
    : route.fullPath,
);

const loadCategory = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.categories.one(categoryId.value);
    category.value = data;
  } catch {}
  loading.value = false;
};

const openDeleteModal = () => {
  if (!category.value) return;

  open(ModalName.DELETE_CATEGORY, { category: category.value });
};

loadCategory();

useHead(() => ({
  title: category.value?.name,
}));
</script>

<template>
  <div :class="$style['page-categories-id']">
    <div :class="$style['page-categories-id__header']">
      <UiText variant="h3">
        {{ category?.name }}
      </UiText>

      <div :class="$style['page-categories-id__header__actions']">
        <UiButton
          v-if="canEdit"
          :to="editPath"
          :disabled="loading"
          color="color-blue"
          variant="outlined"
          size="medium-compact"
        >
          <UiIcon name="ink-pen-rounded" color="color-inherit" />
        </UiButton>

        <UiButton
          v-if="canDelete"
          :disabled="loading"
          color="color-red"
          variant="outlined"
          size="medium-compact"
          @click="openDeleteModal"
        >
          <UiIcon name="delete-rounded" color="color-inherit" />
        </UiButton>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.page-categories-id {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__actions {
      display: flex;
      gap: 0.5rem;
    }
  }
}
</style>
