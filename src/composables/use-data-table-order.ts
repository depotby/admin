import { ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { OrderDirection, Pagination } from '@/types/common.ts';
import type { DataTableOrder } from '@/components/data-table/index.vue';

export interface UseDataTableOrderParams {
  default: {
    param: string;
    direction: OrderDirection;
  };
  availableParams: string[];
}

export const useDataTableOrder = (params: UseDataTableOrderParams, pagination: Ref<Pagination>) => {
  const route = useRoute();
  const router = useRouter();

  const order = ref<DataTableOrder>({
    name:
      typeof route.query.order_param === 'string' &&
      params.availableParams.includes(route.query.order_param)
        ? route.query.order_param
        : params.default.param,
    direction:
      route.query.order_direction === 'asc' || route.query.order_direction === 'desc'
        ? route.query.order_direction
        : params.default.direction,
  });

  const changeOrder = async (value: DataTableOrder, callback?: () => Promise<unknown>) => {
    await router.replace({
      name: 'users',
      query: { ...route.query, page: 1, order_param: value.name, order_direction: value.direction },
    });
    pagination.value.page = 1;
    order.value = value;
    if (callback) await callback();
  };

  return {
    order,
    changeOrder,
  };
};
