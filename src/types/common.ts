export interface Pagination {
  count: number;
  page: number;
  pages: number;
  limit: number;
}

export interface PaginatedResponse<T> extends Pagination {
  items: T[];
}
