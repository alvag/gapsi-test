import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-offline-banner',
  templateUrl: './offline-banner.html',
  styleUrl: './offline-banner.scss',
})
export class OfflineBanner implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly isOffline = signal(!navigator.onLine);

  ngOnInit(): void {
    const onOffline = () => this.isOffline.set(true);
    const onOnline = () => this.isOffline.set(false);

    window.addEventListener('offline', onOffline);
    window.addEventListener('online', onOnline);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('online', onOnline);
    });
  }
}
