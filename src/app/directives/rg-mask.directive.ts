import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRgMask]'
})
export class RgMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 9) value = value.substring(0, 9);

    if (value.length > 7) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
    } else if (value.length > 4) {
      value = value.replace(/^(\d{2})(\d{3})(\d{0,3})$/, '$1.$2.$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,3})$/, '$1.$2');
    }

    this.el.nativeElement.value = value;
  }
}
