import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { VisitorsService } from '../../services/visitors.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private readonly visitorsService = inject(VisitorsService);

  protected readonly visitor = this.visitorsService.visitor;
  protected readonly welcome = computed(() => this.visitor()?.welcome ?? '');
  protected readonly version = computed(() => this.visitor()?.version ?? '');
  protected readonly showProfileCard = signal(false);

  ngOnInit() {
    this.visitorsService.getVisitor();
  }

  toggleProfileCard() {
    this.showProfileCard.update((v) => !v);
  }
}
