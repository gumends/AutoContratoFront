

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
  permissao: string = '';

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
      role: [this.permissao, [Validators.required]]
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
      next: (res: string) => {
        this.carregarDados();
        this.toastr.error('Usuario deletado com sucesso', 'Deletado!');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Erro ao deletar o usuario', 'Erro!');
      }
    });
  }

  carregarDados() {
    this.service.buscarUsuarios(this.pagina, this.tamanho, this.nome).subscribe({
      next: (res: IUsuarioResponse) => {
        this.conteudo = res.content;
        this.pagina = res.number;
        this.total = res.totalPages;
      },
      error: (error) => {
        console.error('Erro ao carregar locatários:', error);
      }
    });
  }

  alterarPermissao(id: string) {
    this.service.alterarPermissao(id, this.form.value).subscribe({
      next: (res: IUsuarioContent) => {
        this.carregarDados();
        this.toastr.success('Permissao alterada com sucesso', 'Alterado!');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Erro ao alterar a permissao', 'Erro!');
      }
    });
  }

  onStatus() {
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