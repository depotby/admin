<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { useDateFormatter } from '@/composables/use-date-formatter.ts';
import DataTable, {
  type DataTableColumn,
  type DataTableItem,
} from '@/components/data-table/index.vue';
import type { Pagination } from '@/types/common.ts';
import type { ListRole } from '@/types/models/role.ts';

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
const roles = ref<ListRole[]>([]);

const columns = computed<DataTableColumn[]>(() => [
  {
    name: 'name',
    text: t('labels.name'),
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
  roles.value.map((item) => ({
    ...item,
    created_at: formatDate(item.created_at, 'DD.MM.YYYY'),
    updated_at: formatDate(item.updated_at, 'DD.MM.YYYY'),
    rowOptions: {
      url: router.resolve({ name: 'roles-id', params: { id: item.id } }).fullPath,
    },
  })),
);

const loadRoles = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const {
      data: { items, ...receivedPagination },
    } = await api.roles.list();
    roles.value = items;
    pagination.value = receivedPagination;
  } catch {}
  loading.value = false;
};

loadRoles();

useHead(() => ({
  title: t('pages.roles.meta.title'),
}));
</script>

<template>
  <DataTable :columns :pagination :items="formattedRoles" />
</template>

<style module lang="scss"></style>
