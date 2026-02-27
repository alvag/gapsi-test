import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import {
  CdkVirtualScrollViewport,
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
} from '@angular/cdk/scrolling';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductCard } from '../../components/product-card/product-card';
import { DragAndDropCart } from '../../components/drag-and-drop-cart/drag-and-drop-cart';
import { Loader } from '../../components/loader/loader';
import { SORT_STRATEGIES, SORT_OPTIONS, SortKey } from '../../strategies/sort.strategy';

@Component({
  selector: 'app-products',
  imports: [
    ProductCard,
    DragAndDropCart,
    Loader,
    CdkDropList,
    CdkDrag,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly loading = this.productService.loading;
  protected readonly cartItems = this.cartService.items;
  protected readonly cartCount = this.cartService.count;

  protected readonly sortKey = signal<SortKey>('default');
  protected readonly sortOptions = SORT_OPTIONS;

  // Patrón Strategy: aplica la estrategia de ordenamiento seleccionada
  protected readonly products = computed(() => {
    const list = this.productService.products();
    const strategy = SORT_STRATEGIES[this.sortKey()];
    return [...list].sort(strategy);
  });

  protected readonly columns = signal(3);
  protected readonly rowHeight = 400;

  // Agrupa los productos en filas de N columnas para el virtual scroll
  protected readonly productRows = computed(() => {
    const items = this.products();
    const cols = this.columns();
    const rows: (typeof items)[] = [];
    for (let i = 0; i < items.length; i += cols) {
      rows.push(items.slice(i, i + cols));
    }
    return rows;
  });

  ngOnInit() {
    this.productService.getProducts();
    this.setupBreakpoints();
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as SortKey;
    this.sortKey.set(value);
  }

  onAddToCart(sku: string) {
    this.cartService.addToCart(sku);
  }

  onRemoveFromCart(sku: string) {
    this.cartService.removeFromCart(sku);
  }

  // Escucha cambios de tamaño del viewport para ajustar
  // la cantidad de columnas del grid (3 desktop, 2 tablet, 1 móvil)
  private setupBreakpoints() {
    const mobile = window.matchMedia('(max-width: 480px)');
    const tablet = window.matchMedia('(max-width: 768px)');

    const update = () => {
      if (mobile.matches) {
        this.columns.set(1);
      } else if (tablet.matches) {
        this.columns.set(2);
      } else {
        this.columns.set(3);
      }
    };

    update();

    mobile.addEventListener('change', update);
    tablet.addEventListener('change', update);

    this.destroyRef.onDestroy(() => {
      mobile.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
    });
  }
}
