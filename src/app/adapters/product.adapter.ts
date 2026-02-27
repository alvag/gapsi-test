// Patrón de diseño: Adapter
// Transforma la respuesta de la API de productos al modelo de dominio interno
import { Product, ProductsResponse } from '../interfaces/product.interface';

export class ProductAdapter {
  static fromResponse(res: ProductsResponse): Product[] {
    return res.data.products.map((p) => ({ ...p, addedToCart: false }));
  }
}
