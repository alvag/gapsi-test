import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { VisitorsService } from '../../services/visitors.service';
import { ButtonDirective } from '../../directives/button';

@Component({
  selector: 'app-welcome',
  imports: [ButtonDirective],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  private readonly router = inject(Router);
  private readonly visitorsService = inject(VisitorsService);

  protected readonly visitor = this.visitorsService.visitor;
  protected readonly welcome = computed(() => this.visitor()?.welcome ?? '');
  protected readonly version = computed(() => this.visitor()?.version ?? '');

  continue() {
    // TODO: navegar a la siguiente ruta
  }
}
