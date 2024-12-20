import type { BaseOrder, BasePagination } from '@/types/common.ts';

export interface ListCategory {
  id: string;
  name: string;
  uri_name: string;
  created_at: string;
  updated_at: string;
}

export interface ListCategoriesParams extends BasePagination, BaseOrder {
  order_param?: 'name';
}
