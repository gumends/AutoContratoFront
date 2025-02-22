import { Component, Input } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIf } from '@angular/common';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [HlmButtonDirective, HlmSpinnerComponent, NgIf],
  template: ` <button type="{{type}}" hlmBtn>{{text}} <hlm-spinner size="sm" *ngIf="loading" /></button> `,
})
export class ButtonPreviewComponent {
  @Input() loading = false
  @Input() type = 'button'
  @Input() text = ''
  @Input() disabled = false
}