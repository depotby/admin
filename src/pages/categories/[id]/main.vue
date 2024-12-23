<script setup lang="ts">
import type { ListCategory } from '@/types/models/category.ts';

const props = defineProps<{ category: ListCategory }>();
</script>

<template>
  <div>
    <pre>{{ props.category }}</pre>
  </div>
</template>

<style module lang="scss"></style>
