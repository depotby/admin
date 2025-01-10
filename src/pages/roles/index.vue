<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useHead } from '@unhead/vue';
import { useApi } from '@/composables/use-api.ts';
import { useFormatter } from '@/composables/use-formatter.ts';
import { useUserStore } from '@/stores/user.ts';
import UiText from '@/components/ui/text.vue';
import UiButton from '@/components/ui/button.vue';
import UiIcon from '@/components/ui/icon.vue';
import DataTable, {
  type DataTableColumn,
  type DataTableItem,
} from '@/components/data-table/index.vue';
import { AbilityName } from '@/types/models/ability.ts';
import type { ListRole } from '@/types/models/role.ts';

const router = useRouter();
const { t } = useI18n();
const api = useApi();
const { dateFormatter } = useFormatter();
const userStore = useUserStore();

const loading = ref(false);
const roles = ref<ListRole[]>([]);

const columns = computed<DataTableColumn[]>(() =>
  [
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
  ].map((column) => ({
    ...column,
    orderable: false,
  })),
);
const formattedRoles = computed<DataTableItem[]>(() =>
  roles.value.map((item) => ({
    ...item,
    created_at: dateFormatter(item.created_at, 'DD.MM.YYYY'),
    updated_at: dateFormatter(item.updated_at, 'DD.MM.YYYY'),
    rowOptions: {
      url: router.resolve({ name: 'roles-id', params: { id: item.id } }).fullPath,
    },
  })),
);

const loadRoles = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { data } = await api.roles.list();
    roles.value = data;
  } catch {}
  loading.value = false;
};

loadRoles();

useHead(() => ({
  title: t('pages.roles.meta.title'),
}));
</script>

<template>
  <div :class="$style['page-roles']">
    <div :class="$style['page-roles__header']">
      <UiText variant="h2">
        {{ $t('labels.roles') }}
      </UiText>

      <UiButton
        v-if="userStore.hasAbility(AbilityName.ROLE_CREATE)"
        :to="{ name: 'roles-new' }"
        size="medium-compact"
      >
        <UiIcon name="add-2-rounded" color="color-inherit" />
      </UiButton>
    </div>

    <DataTable :columns :items="formattedRoles" />
  </div>
</template>

<style module lang="scss">
.page-roles {
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
