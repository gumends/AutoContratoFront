import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";
import { DecimalPipe, KeyValuePipe, NgClass, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormatarDataPipe } from '../../pipes/data.pipe';
import { AppComponent } from "../../components/icon/icon.component";
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { HlmButtonDirective, HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmSelectImports, HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports, BrnSelectModule } from '@spartan-ng/brain/select';
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
import { HlmIconDirective } from "../../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.directive";
import { HlmMenuItemCheckComponent } from "../../../../libs/ui/ui-menu-helm/src/lib/hlm-menu-item-check.component";
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnTableModule } from '@spartan-ng/brain/table';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { KeyValue } from '@angular/common';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
interface IPropriedadeContents {
  [key: string]: any;
}


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
    NgIf,
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
    ContratoComponent
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
          // Alterna o valor entre true e false para uma única coluna
          this.colunasVisiveis[value as keyof typeof this.colunasVisiveis] = !this.colunasVisiveis[value as keyof typeof this.colunasVisiveis];
        } else if (Array.isArray(value)) {
          // Alterna o valor entre true e false para múltiplas colunas
          value.forEach(coluna => {
            this.colunasVisiveis[coluna as keyof typeof this.colunasVisiveis] = !this.colunasVisiveis[coluna as keyof typeof this.colunasVisiveis];
          });
        }
        console.log(this.colunasVisiveis); // Exibe o objeto atualizado no console
      }
    });
  }

  ngOnInit() {
    this.carregarDados();
    this.carregarDados();
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

  onStatus() {
    this.carregarDados();
  }

  recarregar() {
    this.carregarDados();
  }
}