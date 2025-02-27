import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";
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
import { IPropriedadeContent, IPropriedadePaginado } from '../../Types/propriedade';
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
import { ContratoComponent } from "../../components/contrato/contrato.component";
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
    NgClass,
    ContratoComponent
],
  templateUrl: './propriedade.component.html',
  styleUrl: './propriedade.component.css'
})
export class PropriedadeComponent implements OnInit, OnDestroy, OnChanges {

  conteudo: IPropriedadeContent[] = [];
  pagina!: number;
  total!: number;
  propriedades: IPropriedadeContent[] = [];
  status: boolean = true;
  rua: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private servicePropriedade: PropriedadeService,
    private toastr: ToastrService
  ) {
  }
  ngOnChanges(changes: any): void {
    console.log(changes);
  }

  ngOnInit() {
    this.carregarDados();
    this.authService.accountChanged$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.carregarDados();
    });
    this.carregarDados();
  }

  buscar() {
    this.carregarDados();
  }

  desativar(id: string) {
    this.servicePropriedade.desativarPropriedade(id).subscribe({
      next: (res: IPropriedadeContent) => {
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

  carregarDados() {
    this.servicePropriedade.buscarPropriedades(this.status, this.rua).subscribe({
      next: (res: IPropriedadePaginado) => {
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