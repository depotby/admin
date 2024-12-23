<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { RouterLinkProps } from 'vue-router';

export interface Tab {
  name: string;
  title: string;
  to?: RouterLinkProps['to'];
}

const props = withDefaults(
  defineProps<{
    tabs: Tab[];
    pages?: boolean;
  }>(),
  {
    pages: false,
  },
);

const route = useRoute();
const router = useRouter();

const active_tab = ref<string>();

const changeTab = (tab: Tab) => {
  active_tab.value = tab.name;
};

if (props.pages) {
  const tab = props.tabs.find((tab) => tab.to && router.resolve(tab.to)?.name === route.name);

  if (tab) active_tab.value = tab.name;
} else {
  const [firstTab] = props.tabs || [];
  active_tab.value = firstTab?.name;
}
</script>

<template>
  <div :class="$style.tabs">
    <ul :class="$style.tabs__list">
      <li
        v-for="tab in props.tabs"
        :key="tab.name"
        :class="{
          [$style.tabs__list__item]: true,
          [$style['tabs__list__item--active']]: tab.name === active_tab,
        }"
      >
        <RouterLink :to="tab.to ? tab.to : '#'" @click.prevent="() => changeTab(tab)">
          {{ tab.title }}
        </RouterLink>
      </li>
    </ul>

    <div :class="$style.tabs__content">
      <slot v-if="props.pages" />

      <slot v-else :name="active_tab" />
    </div>
  </div>
</template>

<style module lang="scss">
.tabs {
  display: flex;
  flex-direction: column;
  gap: 0.825rem;

  &__list {
    list-style: none;
    display: flex;
    border-block-end: 1px solid $color-border;

    &__item {
      border: 1px solid $color-transparent;
      border-block-end: none;
      border-start-start-radius: 0.375rem;
      border-start-end-radius: 0.375rem;
      background: $color-white;
      color: $color-blue;
      cursor: pointer;
      transition-property: color, border-color;
      transition-duration: $duration-fast;
      transition-timing-function: ease-in-out;

      &--active,
      &:hover {
        border-color: $color-border;
      }

      &--active {
        margin-block-end: -1px;
        color: $color-black;
      }

      > a {
        display: block;
        padding: 0.5rem 1rem;
        color: $color-inherit;
      }
    }
  }

  &__content {
  }
}
</style>
