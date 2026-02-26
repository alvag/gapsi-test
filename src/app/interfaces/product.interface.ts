export interface Product {
  sku: string;
  name: string;
  image: string;
  description: string;
  price: number;
  type: string;
  addedToCart: boolean;
}

export interface ProductsData {
  type: string;
  products: Product[];
}

export interface ProductsResponse {
  code: number;
  description: string;
  data: ProductsData;
}
