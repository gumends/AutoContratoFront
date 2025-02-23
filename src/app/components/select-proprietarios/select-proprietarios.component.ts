import { Component, OnInit } from '@angular/core';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { PropriedadeService } from '../../services/propriedade.service';
import { IPropriedade } from '../../Types/propriedade';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-select-proprietarios',
  imports: [HlmSelectImports, BrnSelectImports, NgFor],
  templateUrl: './select-proprietarios.component.html',
  styleUrl: './select-proprietarios.component.css'
})
export class SelectProprietariosComponent implements OnInit {
  constructor(private service: PropriedadeService) { }

  propriedades: IPropriedade[] = []

  ngOnInit(): void {
    this.service.getPropriedades().subscribe(
      (res: IPropriedade) => {
        console.log(res);
      },
      (error) => {
        console.error('Erro ao carregar locatários:', error);
      }
    );
    console.log(this.propriedades);

  }
}
