<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { usePagination } from '@/composables/use-pagination.ts';
import {
  useDataTableOrder,
  type UseDataTableOrderParams,
} from '@/composables/use-data-table-order.ts';
import { useUserStore } from '@/stores/user.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';
import DataTable, {
  type DataTableColumn,
  type DataTableItem,
} from '@/components/data-table/index.vue';
import { AbilityName } from '@/types/models/ability.ts';
import type { ListCategoriesParams, ListCategory } from '@/types/models/category.ts';

const dataTableOrderParams: UseDataTableOrderParams = {
  default: { param: 'name', direction: 'asc' },
  availableParams: ['name'],
};

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const { pagination, changePage } = usePagination();
const { order, changeOrder } = useDataTableOrder(dataTableOrderParams, pagination);
const userStore = useUserStore();

const loading = ref(false);
const categories = ref<ListCategory[]>([]);

const columns = computed<DataTableColumn[]>(() => [
  {
    name: 'name',
    text: t('labels.name'),
    orderable: true,
  },
]);

const formattedCategories = computed(() =>
  categories.value.map(
    (category): DataTableItem => ({
      ...category,
      rowOptions: {
        url: router.resolve({ name: 'categories-id', params: { id: category.id } }).fullPath,
      },
    }),
  ),
);

const loadCategories = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.categories.list({
      page: pagination.value.page,
      order_param: order.value.name as ListCategoriesParams['order_param'],
      order_direction: order.value.direction,
    });
    categories.value = data.items;
  } catch {}
  loading.value = false;
};

loadCategories();

useHead(() => ({
  title: t('pages.categories.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-categories']">
    <div :class="$style['page-categories__header']">
      <UiText variant="h2">
        {{ $t('labels.categories') }}
      </UiText>

      <UiButton
        v-if="userStore.hasAbility(AbilityName.CATEGORY_CREATE)"
        :to="{ name: 'categories-new' }"
        size="medium-compact"
      >
        <UiIcon name="add-2-rounded" color="color-inherit" />
      </UiButton>
    </div>

    <DataTable
      :columns
      :order
      :pagination
      :items="formattedCategories"
      :pages="pagination.pages"
      :page="pagination.page"
      @update:order="(event) => changeOrder(event, loadCategories)"
      @update:page="(event) => changePage(event, loadCategories)"
    />
  </div>
</template>

<style module lang="scss">
.page-categories {
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
