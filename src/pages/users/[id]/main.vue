<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFormatter } from '@/composables/use-formatter.ts';
import type { ExtendedListUser } from '@/types/models/user.ts';

const { t } = useI18n();
const { dateFormatter } = useFormatter();

const rows = computed(() =>
  [
    {
      name: 'labels.first_name',
      value: props.user.first_name,
    },
    {
      name: 'labels.last_name',
      value: props.user.last_name,
    },
    {
      name: 'labels.middle_name',
      value: props.user.middle_name,
    },
    {
      name: 'labels.email',
      value: props.user.email,
    },
    {
      name: 'labels.updated_date',
      value: dateFormatter(props.user.updated_at, 'DD.MM.YYYY, HH:mm'),
    },
    {
      name: 'labels.created_date',
      value: dateFormatter(props.user.created_at, 'DD.MM.YYYY, HH:mm'),
    },
  ].map((row) => ({
    name: t(row.name),
    value: row.value,
  })),
);

const props = defineProps<{
  user: ExtendedListUser;
}>();
</script>

<template>
  <table :class="simple_table['simple-table']">
    <tbody>
      <tr v-for="row in rows" :key="row.name">
        <th>{{ row.name }}</th>
        <td>{{ row.value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style module="simple_table" src="@/assets/styles/modules/simple-table.scss" />
