<script setup lang="ts">
import { ref, computed, watch, useCssModule } from 'vue';
import { useRoute } from 'vue-router';
import { useMenu } from '@/composables/use-menu.ts';
import { useScreenSize } from '@/composables/use-screen-size.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';

const styles = useCssModule();
const route = useRoute();
const { desktop } = useScreenSize();
const { menu } = useMenu();

const open = ref(false);

const componentTag = computed(() => (desktop.value ? 'aside' : 'header'));
const menuClasses = computed(() => ({
  [styles['app-menu__menu']]: true,
  [styles['app-menu__menu--active']]: open.value,
}));

const toggleMenu = () => {
  open.value = !open.value;
};

watch(
  () => route.fullPath,
  () => {
    if (open.value) open.value = false;
  },
);
</script>

<template>
  <component :is="componentTag" :class="$style['app-menu']">
    <RouterLink :to="{ name: 'index' }" :class="$style['app-menu__logo']">
      <UiText variant="lead" font-weight="500"> Depot </UiText>
    </RouterLink>

    <UiButton v-if="!desktop" variant="outlined" size="medium-compact" @click="toggleMenu">
      <UiIcon name="menu-rounded" color="color-inherit" />
    </UiButton>

    <nav :class="menuClasses">
      <RouterLink
        v-for="item in menu"
        :key="item.id"
        :to="{ name: item.routeName }"
        :active-class="$style['app-menu__menu__link--active']"
        :class="$style['app-menu__menu__link']"
      >
        <UiIcon :name="item.icon" color="color-inherit" size="2rem" />

        <UiText color="color-inherit">
          {{ item.text }}
        </UiText>
      </RouterLink>
    </nav>
  </component>
</template>

<style module lang="scss">
.app-menu {
  padding: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-block-end: 1px solid $color-border;
  background: $color-white;
  z-index: $z-index-menu;

  &__logo {
    padding: 0.5rem;
  }

  &__menu {
    display: none;

    &--active {
      display: flex;
      flex-direction: column;
      position: fixed;
      inset-block-start: $app-menu-mobile-height;
      inset-block-end: 0;
      inset-inline: 0;
      background: $color-inherit;
    }

    &__link {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.375rem;
      color: $color-black;
      transition: color $duration-medium ease-in-out;

      &--active,
      &:hover {
        color: $color-blue;
      }
    }
  }

  @include media-query-desktop {
    justify-content: unset;
    align-items: unset;
    border-block-end: unset;
    flex-direction: column;
    gap: 0.5rem;
    border-inline-end: 1px solid $color-border;

    &__menu {
      display: unset;
      position: unset;
    }
  }
}
</style>
