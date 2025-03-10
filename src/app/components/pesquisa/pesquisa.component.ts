import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropriedadeService } from '../../services/propriedade.service';
import { ProprietarioService } from '../../services/proprietario.service';
import { LocatarioService } from '../../services/locatario.service';
import { AppComponent } from "../icons/moon/moon.component";

@Component({
  selector: 'app-pesquisa',
  standalone: true,
  imports: [NgIf, FormsModule, AppComponent], // Importa FormsModule para suportar [(ngModel)]
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css'] // Correção no nome
})
export class PesquisaComponent {
  pesquisa: string = '';
  abrir: boolean = false;

  constructor(
    private servicePropriedade: PropriedadeService,
    private serviceProprietario: ProprietarioService,
    private serviceLocatario: LocatarioService
  ) { }

  buscaDados() {
    this.abrir = !this.abrir;
    this.serviceLocatario.buscarLocatarios(0, true, this.pesquisa).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });

    this.serviceProprietario.buscarProprietarios(0, true, this.pesquisa).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });

    this.servicePropriedade.buscarPropriedades(true, this.pesquisa).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }
}
