import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropriedadeService } from '../../services/propriedade.service';
import { ProprietarioService } from '../../services/proprietario.service';
import { LocatarioService } from '../../services/locatario.service';
import { AppComponent } from "../icon/icon.component";
import { IPropriedadePaginado } from '../../Types/propriedade';
import { ILocatarioPaginado } from '../../Types/LocatarioResponse';
import { IProprietarioResponse } from '../../Types/Proprietario';
import { RealPipe } from '../../pipes/real.pipe';
import { StatusPipe } from '../../pipes/status.pipe';

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [NgIf, FormsModule, AppComponent, NgFor, RealPipe, StatusPipe],
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent {
  pesquisa: string = '';
  abrir: boolean = false;
  dados: any[] = [];

  @ViewChild('menuPesquisa', { static: false }) menuPesquisa!: ElementRef;

  constructor(
    private servicePropriedade: PropriedadeService,
    private serviceProprietario: ProprietarioService,
    private serviceLocatario: LocatarioService
  ) {}

  buscaDados() {
    if (!this.pesquisa.trim()) {
      this.abrir = false;
      return;
    }
  
    this.dados = [];
  
    this.serviceLocatario.buscarLocatarios(0, 1000, true, this.pesquisa).subscribe({
      next: (response: ILocatarioPaginado) => {
        const locatariosComLink = response.content.map(locatario => ({
          ...locatario,
          link: `http://localhost:4200/locatario/detalhes/${locatario.id}`
        }));
        this.dados = [...this.dados, ...locatariosComLink];
      },
      error: (error) => console.error('Erro ao buscar locatários:', error)
    });
  
    this.serviceProprietario.buscarProprietarios(0, 1000, true, this.pesquisa).subscribe({
      next: (response: IProprietarioResponse) => {
        const proprietariosComLink = response.content.map(proprietario => ({
          ...proprietario,
          link: `http://localhost:4200/proprietario/detalhes/${proprietario.id}`
        }));
        this.dados = [...this.dados, ...proprietariosComLink];
      },
      error: (error) => console.error('Erro ao buscar proprietários:', error)
    });
  
    this.servicePropriedade.buscarPropriedades(0, 1000, true, this.pesquisa).subscribe({
      next: (response: IPropriedadePaginado) => {
        const propriedadesComLink = response.content.map(propriedade => ({
          ...propriedade,
          link: `http://localhost:4200/propriedade/detalhes/${propriedade.id}`
        }));
        this.dados = [...this.dados, ...propriedadesComLink];
      },
      error: (error) => console.error('Erro ao buscar propriedades:', error)
    });
  
    this.abrir = true;
  }
  
  

  @HostListener('document:keydown', ['$event'])
  enter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.buscaDados();
    }
  }
  @HostListener('document:click', ['$event'])
  fecharSeClicarFora(event: Event) {
    if (this.menuPesquisa && this.menuPesquisa.nativeElement && !this.menuPesquisa.nativeElement.contains(event.target)) {
      this.abrir = false;
      this.pesquisa = '';
    }
  }
}
