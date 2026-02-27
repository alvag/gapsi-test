// Patrón de diseño: Strategy
// Define estrategias intercambiables de ordenamiento para productos
import { Product } from '../interfaces/product.interface';

export type SortFn = (a: Product, b: Product) => number;

export type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name-az';

export const SORT_STRATEGIES: Record<SortKey, SortFn> = {
  default: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'name-az': (a, b) => a.name.localeCompare(b.name),
};

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'default', label: 'Sin ordenar' },
  { key: 'price-asc', label: 'Precio: menor a mayor' },
  { key: 'price-desc', label: 'Precio: mayor a menor' },
  { key: 'name-az', label: 'Nombre: A-Z' },
];
