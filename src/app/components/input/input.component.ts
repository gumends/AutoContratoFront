import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { FormsModule } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'label-input',
  standalone: true,
  imports: [HlmLabelDirective, HlmInputDirective, FormsModule],
  template: `
  <div>
    <label hlmLabel>{{ label }}</label>
    <input
      class={{class}}
      hlmInput
      [type]="type"
      [placeholder]="placeholder"
      [value]="value"
      (input)="onInput($event)"
    />
  </div>
`,
providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LabelInputComponent),
    multi: true,
  },
],
})
export class LabelInputComponent implements ControlValueAccessor {

  @Input() class: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
