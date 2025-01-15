import type { ProductPrice } from '@/types/models/product-price.ts';
import type { BaseOrder, BasePagination } from '@/types/common.ts';

export interface ListProduct {
  id: string;
  category_id: string;
  name: string;
  uri_name: string;
  created_at: string;
  updated_at: string;
  product_price: null | ProductPrice;
}

export interface ListProductsParams extends BasePagination, BaseOrder {
  order_param: 'name' | 'uri_name' | 'price' | 'created_at' | 'updated_at';
}

export interface ProductData {
  product: {
    category_id: string;
    name: string;
    uri_name: string;
  };
}
