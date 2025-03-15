import { Component, OnInit, OnDestroy, OnChanges, HostListener } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";
import { LocatarioService } from '../../services/locatario.service';
import { ILocatarioContent, ILocatarioPaginado } from '../../Types/LocatarioResponse';
import { NgClass, NgFor } from '@angular/common';
import { FormatarDataPipe } from '../../pipes/data.pipe';
import { AppComponent } from "../../components/icon/icon.component";
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
  templateUrl: './locatario.component.html',
  styleUrl: './locatario.component.css'
})
export class LocatarioComponent implements OnInit, OnChanges {

  conteudo: ILocatarioContent[] = [];
  pagina!: number;
  total!: number;
  propriedades: IPropriedadeContent[] = [];
  status: boolean = true;
  nome: string = '';
  selectControl = new FormControl('');

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
    if (window.innerWidth < 1022) {
      this.carregarDados(0, 3);
    }
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
          this.toastr.error('Não foi possível realizar o cadastro', 'Erro!');
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
        if (res.status === false) {
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
    this.service.buscarLocatarios(pagina, tamanho, this.status, this.nome).subscribe({
      next: (res: ILocatarioPaginado) => {
        this.conteudo = res.content;
        this.pagina = res.number;
        this.total = res.totalPages;
      },
      error: (error) => {
        console.error('Erro ao carregar locatários:', "Error");
      }
    });
  }

  onStatus() {
    this.carregarDados();
  }

  recarregar() {
    this.carregarDados();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < 1022) {
      this.carregarDados(0, 3);
    }
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
}