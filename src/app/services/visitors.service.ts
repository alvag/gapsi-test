import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { VisitorData, VisitorResponse } from '../interfaces/visitor.interface';

@Injectable({ providedIn: 'root' })
export class VisitorsService {
  private readonly http = inject(HttpClient);
  private readonly _visitor = signal<VisitorData | null>(null);

  readonly visitor = this._visitor.asReadonly();

  getVisitor() {
    this.http.post<VisitorResponse>(`${environment.apiUrl}/visitors`, {}).subscribe({
      next: (res) => this._visitor.set(res.data),
    });
  }
}
