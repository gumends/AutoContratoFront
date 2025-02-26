import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { PropriedadeService } from '../../services/propriedade.service';
import { IPropriedadePaginado, IContent } from '../../Types/propriedade';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-select-proprietarios',
  imports: [HlmSelectImports, BrnSelectImports, NgFor],
  templateUrl: './select-proprietarios.component.html',
  styleUrl: './select-proprietarios.component.css'
})
export class SelectProprietariosComponent implements OnInit {
  constructor(private service: PropriedadeService) { }

  nome: string = "";
  id: string = "";

  propriedades: IContent[] = [];

  @Output() selectedValue = new EventEmitter<string>(); // Emite o valor selecionado

  ngOnInit(): void {
    this.service.getPropriedades().subscribe({
      next: (response) => {
        this.propriedades = response.content;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log('Valor selecionado no componente:', selectedValue); // Verifique se o valor está correto
    this.selectedValue.emit(selectedValue);
  }
}