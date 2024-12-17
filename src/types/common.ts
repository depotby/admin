export interface Pagination {
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export interface PaginatedResponse<T> extends Pagination {
  items: T[];
}

export interface BasePagination {
  page?: number;
}

export type OrderDirection = 'asc' | 'desc';

export interface BaseOrder {
  order_param?: string;
  order_direction?: OrderDirection;
}
