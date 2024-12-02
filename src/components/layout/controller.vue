<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

const LayoutAuthentication = defineAsyncComponent(
  () => import('@/components/layout/authentication.vue'),
);
const LayoutDefault = defineAsyncComponent(() => import('@/components/layout/default.vue'));

const route = useRoute();

const layout = computed(() => {
  switch (route.meta.layout) {
    case undefined:
      return undefined;
    case 'authentication':
      return LayoutAuthentication;
    default:
      return LayoutDefault;
  }
});
</script>

<template>
  <Suspense>
    <component v-if="layout" :is="layout">
      <slot />
    </component>
  </Suspense>
</template>
