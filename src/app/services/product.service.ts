import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { ProductAdapter } from '../adapters/product.adapter';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal(false);

  readonly allProducts = this._products.asReadonly();
  readonly products = computed(() => this._products().filter((p) => !p.addedToCart));
  readonly loading = this._loading.asReadonly();

  getProducts() {
    this._loading.set(true);
    this.http.get<ProductsResponse>(`${environment.apiUrl}/products`).subscribe({
      next: (res) => {
        this._products.set(ProductAdapter.fromResponse(res));
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }

  addToCart(sku: string) {
    this._products.update((products) =>
      products.map((p) => (p.sku === sku ? { ...p, addedToCart: true } : p))
    );
  }

  removeFromCart(sku: string) {
    this._products.update((products) =>
      products.map((p) => (p.sku === sku ? { ...p, addedToCart: false } : p))
    );
  }
}
