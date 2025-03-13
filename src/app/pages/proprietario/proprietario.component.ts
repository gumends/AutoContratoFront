import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";
import { LocatarioService } from '../../services/locatario.service';
import { ILocatarioContent, ILocatarioPaginado } from '../../Types/LocatarioResponse';
import { NgClass, NgFor } from '@angular/common';
import { FormatarDataPipe } from '../../pipes/data.pipe';
import { AppComponent } from "../../components/icons/moon/moon.component";
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { PropriedadeService } from '../../services/propriedade.service';
import { IPropriedadeContent } from '../../Types/propriedade';
import { ToastrService } from 'ngx-toastr';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BrnAlertDialogContentDirective, BrnAlertDialogTriggerDirective } from '@spartan-ng/brain/alert-dialog';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { IContentProprietario, IProprietarioResponse } from '../../Types/Proprietario';
import { ProprietarioService } from '../../services/proprietario.service';
@Component({
  selector: 'app-locatario',
  standalone: true,
  imports: [
    MainContantComponent,
    NgFor,
    FormatarDataPipe,
    AppComponent,
    HlmButtonDirective,
    ReactiveFormsModule,
    FormsModule,
    HlmSelectImports,
    BrnSelectImports,
    HlmBadgeDirective,
    HlmInputDirective,
    HlmAlertDialogComponent,
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,
    HlmAlertDialogComponent,
    HlmAlertDialogContentComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogActionButtonDirective,
    RouterLink,
  ],
  templateUrl: './proprietario.component.html',
  styleUrl: './proprietario.component.css'
})
export class ProprietarioComponent implements OnInit, OnChanges {

  conteudo: IContentProprietario[] = [];
  pagina: number = 0;
  total: number = 10;
  propriedades: IPropriedadeContent[] = [];
  status: boolean = true;
  nome: string = '';
  tamanho: number = 10;
  selectControl = new FormControl('');

  constructor(
    private service: ProprietarioService,
    private servicePropriedade: PropriedadeService,
    private toastr: ToastrService
  ) {
    this.selectControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.carregarDados(0, parseInt(value as string));
      }
    });
  }
  ngOnChanges(changes: any): void {
    console.log(changes);
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.carregarDados();
    this.servicePropriedade.buscarPropriedades().subscribe({
      next: (response) => {
        this.propriedades = response.content;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  buscar() {
    this.carregarDados();
  }

  onSelectChange(event: any) {
    console.log("Valor selecionado:", event);
  }

  desativar(id: string) {
    this.service.desativarProprietario(id).subscribe({
      next: (res: ILocatarioContent) => {
          if(res.status === false){
            this.carregarDados();
            this.toastr.warning('Locatário desativado com sucesso', 'Desativado!');
          } else {
            this.carregarDados();
            this.toastr.success('Locatário ativado com sucesso', 'Ativado!');
          }
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Erro ao desativar locatário', 'Erro!');
      }
    });
  }

  carregarDados(pagina: number = 0, tamanho: number = 10) {
    this.service.buscarProprietarios(pagina, tamanho, this.status, this.nome).subscribe({
      next: (res: IProprietarioResponse) => {
        this.conteudo = res.content;
        this.pagina = res.number;
        this.total = res.totalPages;
      },
      error: (error) => {
        console.error('Erro ao carregar locatários:', error);
      }
    });
  }

  mudarPagina(tipo: string) {
    if (tipo === 'anterior') {
      const pagina = this.pagina - 1;
      this.carregarDados(pagina);
      return;
    }
    const pagina = this.pagina + 1;
    this.carregarDados(pagina);
  }

  onStatus(){
    this.carregarDados();
  }

  recarregar() {
    this.carregarDados();
  }

}