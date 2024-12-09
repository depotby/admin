<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { useDateFormatter } from '@/composables/use-date-formatter.ts';
import UiText from '@/components/ui/text.vue';
import DataTable, {
  type DataTableColumn,
  type DataTableItem,
} from '@/components/data-table/index.vue';
import type { ListUser } from '@/types/models/user.ts';
import type { Pagination } from '@/types/common.ts';

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const { formatDate } = useDateFormatter();

const loading = ref(false);
const pagination = ref<Pagination>({
  limit: 0,
  page: 1,
  pages: 1,
  count: 0,
});
const roles = ref<ListUser[]>([]);

const columns = computed<DataTableColumn[]>(() => [
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
]);

const formattedRoles = computed<DataTableItem[]>(() =>
  roles.value.map(
    (item): DataTableItem => ({
      ...item,
      account_type: t(`labels.user_account_types.${item.account_type}`),
      created_at: formatDate(item.created_at, 'DD.MM.YYYY'),
      updated_at: formatDate(item.created_at, 'DD.MM.YYYY'),
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
    } = await api.users.list();
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

    <DataTable :columns :pagination :items="formattedRoles" />
  </div>
</template>

<style module lang="scss">
.page-users {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
