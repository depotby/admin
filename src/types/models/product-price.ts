export interface ProductPrice {
  id: string;
  product_id: string;
  amount: string;
  created_at: string;
  updated_at: string;
}

export interface ProductPriceData {
  product_price: {
    amount: string;
  };
}
