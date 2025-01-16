<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { useFormatter } from '@/composables/use-formatter.ts';
import { usePagination } from '@/composables/use-pagination.ts';
import { useUserStore } from '@/stores/user.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';
import DataTable, {
  type DataTableColumn,
  type DataTableItem,
} from '@/components/data-table/index.vue';
import {
  useDataTableOrder,
  type UseDataTableOrderParams,
} from '@/composables/use-data-table-order.ts';
import { AbilityName } from '@/types/models/ability.ts';
import type { ListProduct, ListProductsParams } from '@/types/models/product.ts';

const dataTableOrderParams: UseDataTableOrderParams = {
  default: { param: 'name', direction: 'asc' },
  availableParams: ['name', 'uri_name', 'price', 'created_at', 'updated_at'],
};

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const { currencyFormatter, dateFormatter } = useFormatter();
const { pagination, changePage } = usePagination();
const { order, changeOrder } = useDataTableOrder(dataTableOrderParams, pagination);
const userStore = useUserStore();

const loading = ref(false);
const items = ref<ListProduct[]>([]);

const columns = computed<DataTableColumn[]>(() => [
  {
    name: 'name',
    text: t('labels.name'),
    orderable: true,
  },
  {
    name: 'uri_name',
    text: t('labels.uri_name'),
    orderable: true,
  },
  {
    name: 'price',
    text: t('labels.price'),
    orderable: true,
  },
  {
    name: 'created_at',
    text: t('labels.created_date'),
    orderable: true,
  },
  {
    name: 'updated_at',
    text: t('labels.updated_date'),
    orderable: true,
  },
]);
const formattedProducts = computed<DataTableItem[]>(() =>
  items.value.map((item) => ({
    ...item,
    price: currencyFormatter(item.product_price?.amount),
    created_at: dateFormatter(item.created_at, 'DD.MM.YYYY'),
    updated_at: dateFormatter(item.updated_at, 'DD.MM.YYYY'),
    rowOptions: {
      url: router.resolve({ name: 'products-id', params: { id: item.id } }).fullPath,
    },
  })),
);

const loadProducts = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const {
      data: { items: receivedItems, ...receivedPagination },
    } = await api.products.list({
      page: pagination.value.page,
      order_param: order.value.name as ListProductsParams['order_param'],
      order_direction: order.value.direction,
    });
    items.value = receivedItems;
    pagination.value = receivedPagination;
  } catch {}
  loading.value = false;
};

loadProducts();

useHead(() => ({
  title: t('pages.products.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-products']">
    <div :class="$style['page-products__header']">
      <UiText variant="h2">
        {{ $t('labels.products') }}
      </UiText>

      <UiButton
        v-if="userStore.hasAbility(AbilityName.PRODUCT_CREATE)"
        :to="{ name: 'products-new' }"
        size="medium-compact"
      >
        <UiIcon name="add-2-rounded" color="color-inherit" />
      </UiButton>
    </div>

    <DataTable
      :columns
      :order
      :loading
      :items="formattedProducts"
      :pages="pagination.pages"
      :page="pagination.page"
      @update:order="(event) => changeOrder(event, loadProducts)"
      @update:page="(event) => changePage(event, loadProducts)"
    />
  </div>
</template>

<style module lang="scss">
.page-products {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
