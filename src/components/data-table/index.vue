<script setup lang="ts">
import DataTablePagination from '@/components/data-table/pagination.vue';

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
    items: DataTableItem[];
    pages?: number;
    loading?: boolean;
  }>(),
  {
    pages: 1,
    loading: false,
  },
);

const page = defineModel<number>('page');
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

    <DataTablePagination
      v-if="page && props.pages > 1"
      v-model="page"
      :pages="props.pages"
      :class="$style['data-table__pagination']"
    />
  </div>
</template>

<style module lang="scss">
.data-table {
  width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;

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

  &__pagination {
    align-self: center;
  }
}
</style>
