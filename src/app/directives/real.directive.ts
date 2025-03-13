import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]'
})
export class CurrencyMaskDirective {
  private lastValue: string = '';

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let rawValue = event.target.value.replace(/\D/g, '');

    if (rawValue === '') {
      this.el.nativeElement.value = '';
      this.control.control?.setValue(null, { emitEvent: false });
      return;
    }

    let intValue = parseInt(rawValue, 10);
    let formattedValue = (intValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    this.el.nativeElement.value = formattedValue;

    let numericValue = (intValue / 100).toFixed(2);
    this.control.control?.setValue(numericValue, { emitEvent: false });
  }
}
