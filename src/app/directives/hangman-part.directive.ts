import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHangmanPart]'
})
export class HangmanPartDirective {
  constructor(private elementRef: ElementRef<SVGSVGElement>) {}

  public show(): void {
    this.elementRef.nativeElement.classList.add('active');
  }

  public hide(): void {
    this.elementRef.nativeElement.classList.remove('active');
  }
}
