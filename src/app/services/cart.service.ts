import { computed, inject, Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly productService = inject(ProductService);

  readonly items = computed(() => this.productService.allProducts().filter((p) => p.addedToCart));
  readonly count = computed(() => this.items().length);

  addToCart(sku: string) {
    this.productService.addToCart(sku);
  }

  removeFromCart(sku: string) {
    this.productService.removeFromCart(sku);
  }
}
