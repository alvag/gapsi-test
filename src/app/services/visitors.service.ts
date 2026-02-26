import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { VisitorData, VisitorResponse } from '../interfaces/visitor.interface';

@Injectable({ providedIn: 'root' })
export class VisitorsService {
  private readonly http = inject(HttpClient);
  private readonly _visitor = signal<VisitorData | null>(null);
  private readonly _loading = signal(false);

  readonly visitor = this._visitor.asReadonly();
  readonly loading = this._loading.asReadonly();

  getVisitor() {
    this._loading.set(true);
    this.http.post<VisitorResponse>(`${environment.apiUrl}/visitors`, {}).subscribe({
      next: (res) => {
        this._visitor.set(res.data);
        this._loading.set(false);
      },
      error: () => this._loading.set(false),
    });
  }
}
