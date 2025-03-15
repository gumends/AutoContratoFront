import { Component, OnInit, HostListener } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";
import { NgFor } from '@angular/common';
import { FormatarDataPipe } from '../../pipes/data.pipe';
import { AppComponent } from "../../components/icon/icon.component";
import { HlmButtonDirective, HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HlmSelectImports, HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports, BrnSelectModule } from '@spartan-ng/brain/select';
import { PropriedadeService } from '../../services/propriedade.service';
import { IPropriedadeContent, IPropriedadePaginado } from '../../Types/propriedade';
import { ToastrService } from 'ngx-toastr';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { RouterLink } from '@angular/router';
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
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnTableModule } from '@spartan-ng/brain/table';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';


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
    RouterLink,
    FormsModule,
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    HlmButtonModule,
    HlmInputDirective,
    BrnSelectModule,
    HlmSelectModule,
    HlmInputDirective,
    HlmButtonDirective,
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
  ],
  templateUrl: './propriedade.component.html',
  styleUrl: './propriedade.component.css'
})

export class PropriedadeComponent implements OnInit {

  conteudo: IPropriedadeContent[] = [];
  pagina!: number;
  total!: number;
  propriedades: IPropriedadeContent[] = [];
  status: boolean = true;
  rua: string = '';
  selectControl = new FormControl('');

  selectControlColunas = new FormControl('');

  ruaExibir: boolean = false;
  numeroExibir: boolean = false;
  casa: boolean = false;
  bairro: boolean = false;
  cep: boolean = false;
  localizacao: boolean = false;
  locatario: boolean = false;
  aluguel: boolean = false;
  dataPagamento: boolean = false;
  proprietario: boolean = false;
  statusExibir: boolean = false;

  colunasVisiveis = {
    rua: true,
    numero: true,
    casa: true,
    bairro: true,
    cep: true,
    localizacao: true,
    locatario: true,
    aluguel: true,
    dataPagamento: true,
    proprietario: true,
    status: true
  };

  constructor(
    private servicePropriedade: PropriedadeService,
    private toastr: ToastrService
  ) {
    this.selectControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.carregarDados(0, parseInt(value as string));
      }
    });
    this.selectControlColunas.valueChanges.subscribe((value: string | string[] | null) => {
      if (value !== null) {
        if (typeof value === 'string') {
          this.colunasVisiveis[value as keyof typeof this.colunasVisiveis] = !this.colunasVisiveis[value as keyof typeof this.colunasVisiveis];
        } else if (Array.isArray(value)) {
          value.forEach(coluna => {
            this.colunasVisiveis[coluna as keyof typeof this.colunasVisiveis] = !this.colunasVisiveis[coluna as keyof typeof this.colunasVisiveis];
          });
        }
        console.log(this.colunasVisiveis);
      }
    });
  }

  ngOnInit() {
    this.carregarDados();
    this.carregarDados();
    if (window.innerWidth < 1022) {
      this.carregarDados(0, 3);
    }
  }

  buscar() {
    this.carregarDados();
  }

  desativar(id: string) {
    this.servicePropriedade.desativarPropriedade(id).subscribe({
      next: (res: IPropriedadeContent) => {
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
    this.servicePropriedade.buscarPropriedades(pagina, tamanho, this.status, this.rua).subscribe({
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

  mudarPagina(tipo: string) {
    if (tipo === 'anterior') {
      const pagina = this.pagina - 1;
      this.carregarDados(pagina);
      return;
    }
    const pagina = this.pagina + 1;
    this.carregarDados(pagina);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth < 1022) {
      this.carregarDados(0, 3);
    }
  }

  onStatus() {
    this.carregarDados();
  }

  recarregar() {
    this.carregarDados();
  }
}