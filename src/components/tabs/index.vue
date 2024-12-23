<script setup lang="ts">
import { ref } from 'vue';

export interface Tab {
  name: string;
  title: string;
}

const props = defineProps<{
  tabs: Tab[];
}>();

const active_tab = ref<string>(props.tabs[0]?.name);
</script>

<template>
  <div :class="$style.tabs">
    <ul :class="$style.tabs__list">
      <li
        v-for="tab in props.tabs"
        :key="tab.name"
        @click="active_tab = tab.name"
        :class="{
          [$style.tabs__list__item]: true,
          [$style['tabs__list__item--active']]: tab.name === active_tab,
        }"
      >
        {{ tab.title }}
      </li>
    </ul>

    <div :class="$style.tabs__content">
      <slot :name="active_tab" />
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
      padding: 0.5rem 1rem;
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
    }
  }

  &__content {
  }
}
</style>
