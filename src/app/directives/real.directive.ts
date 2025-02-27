import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyMask]'
})
export class CurrencyMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (value === '') {
      this.el.nativeElement.value = '';
      return;
    }

    let intValue = parseInt(value, 10);
    let formattedValue = (intValue / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    this.el.nativeElement.value = formattedValue;
  }
}
