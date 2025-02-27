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
    NgClass
  ],
  templateUrl: './locatario.component.html',
  styleUrl: './locatario.component.css'
})
export class LocatarioComponent implements OnInit, OnDestroy, OnChanges {

  conteudo: ILocatarioContent[] = [];
  pagina!: number;
  total!: number;
  propriedades: IPropriedadeContent[] = [];
  status: boolean = true;
  nome: string = '';

  private destroy$ = new Subject<void>();

  form: FormGroup;

  constructor(
    private service: LocatarioService,
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
    this.authService.accountChanged$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.carregarDados();
    });
    this.servicePropriedade.buscarPropriedades().subscribe({
      next: (response) => {
        this.propriedades = response.content;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  register() {
    if (this.form.valid) {
      const formData = this.form.value;
      this.service.criarLocatario(formData).subscribe({
        next: (response) => {
          this.toastr.success('Locatário cadastrado realizado com sucesso', 'Cadastro!');
          this.carregarDados();
          this.form.reset();
        },
        error: (error) => {
          this.toastr.error('Não foi possivel realizar o cadastro', 'Erro!');
          console.log(error);
        }
      })
      // Envie os dados para o servidor
    } else {
      console.error('Formulário inválido');
    }
  }

  atualizar() {
    console.log(this.form.value);

    if (this.form.valid) {
      const formData = this.form.value;
      
      this.service.atualizarLocatario(formData).subscribe({
        next: (response) => {
          this.toastr.success('Locatário atualizado com sucesso', 'Atualizado!');
          this.carregarDados();
          this.form.reset();
        },
        error: (error) => {
          this.toastr.error('Não foi atualizar o locatário', 'Erro!');
          console.log(error);
        }
      })
      // Envie os dados para o servidor
    } else {
      console.error('Formulário inválido');
    }
  }

  buscar() {
    this.carregarDados();
  }

  desativar(id: string) {
    this.service.desativarLocatario(id).subscribe({
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

  carregarDados() {
    // this.route.queryParamMap.subscribe(params => {
    //   if (params.get('status')) {
    //     console.log(params.get('status'));
    //     this.status = params.get('status') === 'true' ? true : false;
    //   }
    // });
    this.service.buscarLocatarios(this.pagina, this.status, this.nome).subscribe({
      next: (res: ILocatarioPaginado) => {
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

  mudarPagina(pagina: number) {
    this.service.buscarLocatarios(pagina).subscribe(
      (res: ILocatarioPaginado) => {
        this.conteudo = res.content;
        this.pagina = res.number;
        this.total = res.totalPages;
      },
      (error) => {
        console.error('Erro ao carregar locatários:', error);
      }
    );
  }
}