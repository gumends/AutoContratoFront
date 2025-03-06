

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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { UsuarioService } from '../../services/usuario.service';
import { IUsuarioContent, IUsuarioResponse } from '../../Types/Usuario';
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
    RouterLink
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit, OnDestroy, OnChanges {

  conteudo: IUsuarioContent[] = []
  pagina: number = 0; 
  tamanho: number = 10;
  total!: number;
  status: boolean = true;
  nome: string = '';

  private destroy$ = new Subject<void>();

  form: FormGroup;

  constructor(
    private service: UsuarioService,
    private authService: AuthService,
    private fb: FormBuilder,
    private servicePropriedade: PropriedadeService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(6)]],
      cpf: ["", [Validators.required]],
      nascimento: ["", [Validators.required]],
      rg: ["", [Validators.required]],
      propriedadeId: [null] // Adicione isso ao formulário
    });
  }
  ngOnChanges(changes: any): void {
    console.log(changes);
    throw new Error('Method not implemented.');
  }

  get selectedValue() {
    return this.form.get('propriedadeId')?.value;
  }

  ngOnInit() {
    this.carregarDados();
  }

  buscar() {
    this.carregarDados();
  }

  deletar(id: string) {
    this.service.deletarUsuario(id).subscribe({
      next: (res: any) => {
          if(res.status === false){
            this.carregarDados();
            this.toastr.warning('Usuario deletado com sucesso', 'Desativado!');
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

  carregarDados() {
    this.service.buscarUsuarios(this.pagina, this.tamanho, this.nome).subscribe({
      next: (res: IUsuarioResponse) => {
        console.log(res.content);
        
        this.conteudo = res.content;
        this.pagina = res.number;
        this.total = res.totalPages;
      },
      error: (error) => {
        console.error('Erro ao carregar locatários:', error);
      }
    });
  }

  onStatus(){
    this.carregarDados();
  }

  recarregar() {
    this.carregarDados();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}