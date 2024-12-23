<script setup lang="ts">
import type { ListCategory } from '@/types/models/category.ts';

const props = defineProps<{ category: ListCategory }>();
</script>

<template>
  <div>
    <table :class="simple_table">
      <tbody>
        <tr>
          <th>{{ $t('labels.name') }}</th>
          <td>{{ props.category.name }}</td>
        </tr>
        <tr>
          <th>{{ $t('labels.uri_name') }}</th>
          <td>{{ props.category.uri_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style module="simple_table" src="@/assets/styles/modules/simple-table.scss" />

<style module lang="scss"></style>
