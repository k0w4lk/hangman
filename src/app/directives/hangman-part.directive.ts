import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHangmanPart]'
})
export class HangmanPartDirective {
  constructor(private elementRef: ElementRef<SVGSVGElement>) {}

  show(): void {
    this.elementRef.nativeElement.classList.add('active');
  }

  hide(): void {
    this.elementRef.nativeElement.classList.remove('active');
  }
}
