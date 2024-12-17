<script setup lang="ts">
import { computed } from 'vue';
import UiIcon from '@/components/ui/icon.vue';
import DataTablePagination from '@/components/data-table/pagination.vue';

export interface DataTableOrder {
  name: string;
  direction: 'asc' | 'desc';
}

export interface DataTableItem {
  [key: string]: any;
  rowOptions?: {
    url?: string;
  };
}

export interface DataTableColumn {
  name: string;
  text: string;
  orderable: boolean;
}

interface DataTablePreparedColumn extends DataTableColumn {
  orderActive: boolean;
  orderIconRotation: 0 | 180;
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

const order = defineModel<DataTableOrder>('order');
const page = defineModel<number>('page');

const preparedColumns = computed(() =>
  props.columns.map(
    (column): DataTablePreparedColumn => ({
      ...column,
      orderActive: order.value?.name === column.name,
      orderIconRotation:
        order.value?.name === column.name && order.value.direction === 'desc' ? 180 : 0,
    }),
  ),
);

const changeOrder = (column: DataTablePreparedColumn) => {
  if (!column.orderable) return;

  if (column.name === order.value?.name) {
    order.value = {
      name: column.name,
      direction: order.value.direction === 'asc' ? 'desc' : 'asc',
    };
  } else {
    order.value = {
      name: column.name,
      direction: 'asc',
    };
  }
};
</script>

<template>
  <div :class="$style['data-table']">
    <table :class="$style['data-table__table']">
      <thead>
        <tr>
          <th
            v-for="column in preparedColumns"
            :key="column.name"
            :class="{
              [$style['data-table__table__header']]: true,
              [$style['data-table__table__header--orderable']]: column.orderable,
            }"
            @click="() => changeOrder(column)"
          >
            <div>
              {{ column.text }}

              <UiIcon
                v-if="column.orderable"
                :name="'arrow-downward-alt-rounded'"
                :rotate="column.orderIconRotation"
                :class="{
                  [$style['data-table__table__order']]: true,
                  [$style['data-table__table__order--active']]: column.orderActive,
                }"
              />
            </div>
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
    $table-class: &;

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

          &#{$table-class} {
            &__header {
              > div {
                display: flex;
                align-items: center;
              }

              &--orderable {
                cursor: pointer;
              }

              #{$table-class} {
                &__order {
                  color: $color-transparent;
                  transition-property: color, transform;
                  transition-duration: $duration-medium;
                  transition-timing-function: ease-in-out;

                  &--active {
                    color: $color-black;
                  }
                }
              }

              &:hover {
                #{$table-class} {
                  &__order {
                    color: $color-gray;
                  }
                }
              }
            }
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
