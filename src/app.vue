<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import LayoutController from '@/components/layout/controller.vue';

const { t } = useI18n();

useHead(() => ({
  titleTemplate: t('meta.title_template'),
  title: t('labels.loading_with_dots'),
}));
</script>

<template>
  <LayoutController>
    <RouterView />
  </LayoutController>
</template>
