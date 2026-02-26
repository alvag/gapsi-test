import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appButton]',
})
export class ButtonDirective implements OnInit {
  variant = input<'primary' | 'outline'>('primary');

  private readonly el = inject(ElementRef);

  ngOnInit() {
    const element = this.el.nativeElement as HTMLElement;
    element.classList.add('btn', 'app-btn');

    if (this.variant() === 'primary') {
      element.classList.add('app-btn--primary');
    } else {
      element.classList.add('app-btn--outline');
    }
  }
}
