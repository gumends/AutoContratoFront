
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';
import {
  HlmDialogComponent,
} from '@spartan-ng/ui-dialog-helm';
import { AppComponent } from "../icon/icon.component";
import { PropriedadeService } from '../../services/propriedade.service';
import { IPropriedadeContent } from '../../Types/propriedade';

@Component({
  selector: 'dialog-contrato',
  standalone: true,
  imports: [
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmButtonDirective,
    AppComponent,
  ],
  templateUrl: './contrato.component.html',
})
export class ContratoComponent implements OnInit {

  constructor(
    private servicePropriedade: PropriedadeService,
    private el: ElementRef, 
    private renderer: Renderer2) { }

  @Input() id: string = "";

  propriedade!: IPropriedadeContent

  ngOnInit(): void {
    this.buscaProprietario();
  }

  buscaProprietario() {
    this.servicePropriedade.buscarPropriedade(this.id).subscribe({
      next: (response) => {
        this.propriedade = response
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
