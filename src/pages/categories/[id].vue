<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import type { ListCategory } from '@/types/models/category.ts';

const route = useRoute();
const api = useApi();

const loading = ref(false);
const category = ref<ListCategory>();

const categoryId = computed(() => category.value?.id ?? (route.params.id as string));

const loadCategory = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.categories.one(categoryId.value);
    category.value = data;
  } catch {}
  loading.value = false;
};

loadCategory();

useHead(() => ({
  title: category.value?.name,
}));
</script>

<template>
  <div></div>
</template>

<style module lang="scss"></style>
