import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { VisitorsService } from '../../services/visitors.service';

@Component({
  selector: 'app-header',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly visitorsService = inject(VisitorsService);

  protected readonly cartCount = this.cartService.count;
  protected readonly cartItems = this.cartService.items;
  protected readonly cartTotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.price, 0)
  );
  protected readonly showCartDropdown = signal(false);

  protected readonly visitor = this.visitorsService.visitor;
  protected readonly welcome = computed(() => this.visitor()?.welcome ?? '');
  protected readonly version = computed(() => this.visitor()?.version ?? '');
  protected readonly showProfileCard = signal(false);

  ngOnInit() {
    this.visitorsService.getVisitor();
  }

  toggleCartDropdown() {
    this.showCartDropdown.update((v) => !v);
    this.showProfileCard.set(false);
  }

  onRemoveFromCart(sku: string) {
    this.cartService.removeFromCart(sku);
  }

  onReset() {
    window.location.href = '/';
  }

  toggleProfileCard() {
    this.showProfileCard.update((v) => !v);
    this.showCartDropdown.set(false);
  }
}
