<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    pages: number;
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);

const model = defineModel<number>({ required: true });

const pages = computed(() => {
  const range = 1;

  const result: (string | number)[] = [1];

  if (model.value > range + 2) result.push('...');

  for (
    let i = Math.max(2, model.value - range);
    i <= Math.min(props.pages - 1, model.value + range);
    i++
  ) {
    result.push(i);
  }

  if (model.value < props.pages - range - 1) result.push('...');

  if (props.pages > 1) result.push(props.pages);

  return result;
});

const changePage = (page: number) => {
  if (page >= 1 && page <= props.pages && page !== model.value) {
    model.value = page;
  }
};
</script>

<template>
  <ul :class="$style['data-table-pagination']">
    <li :class="$style['data-table-pagination__item']">
      <button :disabled="model <= 1" @click="changePage(1)">«</button>
    </li>

    <li
      v-for="page in pages"
      :key="page"
      :class="{
        [$style['data-table-pagination__item']]: true,
        [$style['data-table-pagination__item--active']]: model === page,
      }"
    >
      <button @click="typeof page === 'number' && changePage(page)">
        {{ page }}
      </button>
    </li>

    <li :class="$style['data-table-pagination__item']">
      <button :disabled="model >= props.pages" @click="changePage(props.pages)">»</button>
    </li>
  </ul>
</template>

<style module lang="scss">
.data-table-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.375rem;
  list-style: none;

  &__item {
    button {
      border: 1px solid $color-border;
      background-color: $color-white;
      color: $color-black;
      cursor: pointer;
      padding: 0.375rem 0.75rem;
      transition-property: background-color, border-color;
      transition-duration: $duration-medium;
      transition-timing-function: ease-in-out;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }

    &:first-of-type,
    &:last-of-type {
      button {
        padding-inline: 1.375rem;
      }
    }

    &:first-of-type {
      button {
        border-inline-end-width: 0.5px;
        border-start-start-radius: 0.375rem;
        border-end-start-radius: 0.375rem;
      }
    }

    &:last-of-type {
      button {
        border-inline-start-width: 0.5px;
        border-start-end-radius: 0.375rem;
        border-end-end-radius: 0.375rem;
      }
    }

    &:not(:first-of-type):not(:last-of-type) {
      button {
        border-inline-width: 0.5px;
      }
    }

    &:hover:not(:disabled):not(&--active) {
      button {
        background-color: $color-light;
      }
    }

    &--active {
      button {
        font-weight: 700;
        color: $color-white;
        background-color: $color-blue;
        border-color: $color-blue;
      }
    }
  }
}
</style>
