<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';

const { t } = useI18n();

useHead(() => ({
  title: t('pages.roles.meta.title'),
}));
</script>

<template>
  <div>Roles</div>
</template>

<style module lang="scss"></style>
