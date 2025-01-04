<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import {
  useDataTableOrder,
  type UseDataTableOrderParams,
} from '@/composables/use-data-table-order.ts';
import { usePagination } from '@/composables/use-pagination.ts';
import { useFormatter } from '@/composables/use-formatter.ts';
import UiText from '@/components/ui/text.vue';
import DataTable, {
  type DataTableColumn,
  type DataTableItem,
} from '@/components/data-table/index.vue';
import type { ListUser, ListUsersParams } from '@/types/models/user.ts';

const dataTableOrderParams: UseDataTableOrderParams = {
  default: { param: 'created_at', direction: 'desc' },
  availableParams: ['email', 'first_name', 'last_name', 'account_type', 'created_at', 'updated_at'],
};

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const { pagination, changePage } = usePagination();
const { order, changeOrder } = useDataTableOrder(dataTableOrderParams, pagination);
const { dateFormatter } = useFormatter();

const loading = ref(false);
const roles = ref<ListUser[]>([]);

const columns = computed<DataTableColumn[]>(() =>
  [
    {
      name: 'email',
      text: t('labels.email'),
    },
    {
      name: 'first_name',
      text: t('labels.first_name'),
    },
    {
      name: 'last_name',
      text: t('labels.last_name'),
    },
    {
      name: 'account_type',
      text: t('labels.type'),
    },
    {
      name: 'created_at',
      text: t('labels.created_date'),
    },
    {
      name: 'updated_at',
      text: t('labels.updated_date'),
    },
  ].map((column) => ({
    ...column,
    orderable: dataTableOrderParams.availableParams.includes(column.name),
  })),
);

const formattedRoles = computed<DataTableItem[]>(() =>
  roles.value.map(
    (item): DataTableItem => ({
      ...item,
      account_type: t(`labels.user_account_types.${item.account_type}`),
      created_at: dateFormatter(item.created_at, 'DD.MM.YYYY'),
      updated_at: dateFormatter(item.created_at, 'DD.MM.YYYY'),
      rowOptions: {
        url: router.resolve({ name: 'users-id', params: { id: item.id } })?.fullPath,
      },
    }),
  ),
);

const loadUsers = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const {
      data: { items, ...receivedPagination },
    } = await api.users.list({
      page: pagination.value.page,
      order_param: order.value.name as ListUsersParams['order_param'],
      order_direction: order.value.direction,
    });
    pagination.value = receivedPagination;
    roles.value = items;
  } catch {}
  loading.value = false;
};

loadUsers();

useHead(() => ({
  title: t('pages.users.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-users']">
    <UiText variant="h2">
      {{ $t('labels.users') }}
    </UiText>

    <DataTable
      :columns
      :order
      :pagination
      :items="formattedRoles"
      :pages="pagination.pages"
      :page="pagination.page"
      @update:order="(event) => changeOrder(event, loadUsers)"
      @update:page="(event) => changePage(event, loadUsers)"
    />
  </div>
</template>

<style module lang="scss">
.page-users {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
