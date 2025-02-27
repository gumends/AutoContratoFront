import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCepMask]'
})
export class CepMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é número

    if (value.length > 8) value = value.substring(0, 8);

    // Aplica a máscara XXXXX-XXX
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{0,3})$/, '$1-$2');
    }

    this.el.nativeElement.value = value;
  }
}
