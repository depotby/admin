<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';

const { t } = useI18n();

useHead(() => ({
  title: t('pages.users.meta.title'),
}));
</script>

<template>
  <div>Users</div>
</template>

<style module lang="scss"></style>
