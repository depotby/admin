import type { CategoryPropertyOption } from '@/types/models/category-property-option.ts';

export interface ListCategoryProperty {
  id: string;
  category_id: string;
  name: string;
  uri_name: string;
  created_at: string;
  updated_at: string;
  options: CategoryPropertyOption[];
}

export interface CategoryPropertyData {
  category_property: {
    name: string;
    uri_name: string;
  };
}
