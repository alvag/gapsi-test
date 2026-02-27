import { Component, input, output } from '@angular/core';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-drag-and-drop-cart',
  imports: [CdkDropList],
  templateUrl: './drag-and-drop-cart.html',
  styleUrl: './drag-and-drop-cart.scss',
})
export class DragAndDropCart {
  items = input.required<Product[]>();
  count = input.required<number>();
  drop = output<string>();
  remove = output<string>();

  onDrop(event: CdkDragDrop<Product[]>) {
    this.drop.emit(event.item.data.sku);
  }
}
