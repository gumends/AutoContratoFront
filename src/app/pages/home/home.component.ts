import { Component, OnInit } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";

import { HlmTableModule } from "../../../../libs/ui/ui-table-helm/src/index";
import { CardComponent } from "../../components/card/card.component";
import { CardItemComponent } from "../../components/card-item/card-item.component";
import { LocatarioService } from '../../services/locatario.service';
import { PropriedadeService } from '../../services/propriedade.service';
import { ProprietarioService } from '../../services/proprietario.service';
import { ILocatarioContent } from '../../Types/LocatarioResponse';
import { IContentProprietario } from '../../Types/Proprietario';
import { IPropriedadeContent } from '../../Types/propriedade';
import { NgFor, NgIf } from '@angular/common';
import { RealPipe } from '../../pipes/real.pipe';

@Component({
  
  imports: [MainContantComponent, HlmTableModule, CardComponent, CardItemComponent, NgFor, NgIf, RealPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private locatarioService: LocatarioService,
    private propriedadeService: PropriedadeService,
    private proprietarioService: ProprietarioService
  ) {}

  locararios: ILocatarioContent[] = [];
  proprietarios: IContentProprietario[] = [];
  propriedades: IPropriedadeContent[] = [];
  casaDisponiveis: number = 0;
  casaOcupadas: number = 0;
  aluguelReceber: number = 0;
  aluguelTotal: number = 0;

  ngOnInit(): void {
    this.buscarLocatarios()
    this.buscarProprietarios()
    this.buscarPropriedades()
    this.buscaAluguel()
  }

  buscarLocatarios(){
    this.locatarioService.buscarLocatarios(0, true, '').subscribe({
      next: (response) => {
        this.locararios = response.content;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  buscarProprietarios(){
    this.proprietarioService.buscarProprietarios(0, 1000, true, '').subscribe({
      next: (response) => {
        this.proprietarios = response.content;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  buscarPropriedades(){
    this.propriedadeService.buscarPropriedades().subscribe({
      next: (response) => {
        this.propriedades = response.content;
        this.casaDisponiveis = this.propriedades.filter(propriedade => propriedade.alugada === false).length;
        this.casaOcupadas = this.propriedades.filter(propriedade => propriedade.alugada === true).length;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  buscaAluguel(){
    this.propriedadeService.buscaAluguel().subscribe({
      next: (response) => {
        this.aluguelReceber = response.receber
        this.aluguelTotal = response.total
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
