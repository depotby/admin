<script setup lang="ts">
import type { Pagination } from '@/types/common.ts';

export interface DataTableItem {
  [key: string]: any;
  rowOptions?: {
    url?: string;
  };
}

export interface DataTableColumn {
  name: string;
  text: string;
}

const props = withDefaults(
  defineProps<{
    columns: DataTableColumn[];
    pagination: Pagination;
    items: DataTableItem[];
  }>(),
  {},
);
</script>

<template>
  <div :class="$style['data-table']">
    <table :class="$style['data-table__table']">
      <thead>
        <tr>
          <th v-for="column in props.columns" :key="column.name">
            {{ column.text }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in props.items" :key="item.id">
          <td v-for="(column, index) in props.columns" :key="column.name">
            <RouterLink
              v-if="index === 0 && item.rowOptions?.url"
              :to="item.rowOptions.url"
              :class="$style['data-table__table__link']"
            >
              {{ item[column.name] }}
            </RouterLink>

            <template v-else>
              {{ item[column.name] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style module lang="scss">
.data-table {
  width: 100%;
  overflow-x: auto;

  &__table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr {
        th {
          height: 40px;
          padding-inline: 0.5rem;
          text-align: start;
          background: $color-light;

          &:first-of-type {
            border-start-start-radius: 0.5rem;
          }

          &:last-of-type {
            border-start-end-radius: 0.5rem;
          }
        }
      }
    }

    tbody {
      tr {
        height: 40px;
        transform: rotate(0);
        cursor: pointer;
        transition: background-color $duration-fast linear;

        &:hover {
          background-color: $color-light;
        }

        td {
          padding-inline: 0.5rem;
        }
      }
    }

    &__link {
      color: unset;

      &:after {
        content: '';
        position: absolute;
        inset: 0;
      }
    }
  }
}
</style>
