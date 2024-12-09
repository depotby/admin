<script setup lang="ts">
import AppMenu from '@/components/app/menu.vue';
import AppModal from '@/components/app/modal.vue';
</script>

<template>
  <div :class="$style['layout-default']">
    <AppMenu :class="$style['layout-default__menu']" />

    <div :class="$style['layout-default__main']">
      <slot />
    </div>

    <AppModal />
  </div>
</template>

<style module lang="scss">
.layout-default {
  min-width: 100dvw;
  min-height: 100dvh;

  &__menu {
    position: fixed;
    inset-block-start: 0;
    inset-inline-start: 0;
    width: 100dvw;
    height: $app-menu-mobile-height;
    max-height: $app-menu-mobile-height;
  }

  &__main {
    padding-block-start: calc($app-menu-mobile-height + 1rem);
    padding-inline: 1rem;
  }

  @include media-query-desktop {
    &__menu {
      width: $app-menu-desktop-width;
      height: 100dvh;
      max-height: 100dvh;
    }

    &__main {
      padding-block-start: 1rem;
      padding-inline: calc($app-menu-desktop-width + 1rem) 1rem;
    }
  }
}
</style>
