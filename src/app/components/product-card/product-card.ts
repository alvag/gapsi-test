import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../interfaces/product.interface';
import { ButtonDirective } from '../../directives/button';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, ButtonDirective],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  product = input.required<Product>();
  add = output<string>();

  onAddToCart() {
    this.add.emit(this.product().sku);
  }
}
