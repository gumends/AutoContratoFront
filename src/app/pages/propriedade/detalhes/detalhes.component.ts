import { Component, OnInit } from '@angular/core';
import { MainContantComponent } from "../../../components/main-contant/main-contant.component";
import { AppComponent } from "../../../components/icons/moon/moon.component";
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { ButtonPreviewComponent } from "../../../components/button/button.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropriedadeService } from '../../../services/propriedade.service';
import { IPropriedadeContent } from '../../../Types/propriedade';
import { NgFor } from '@angular/common';
import { RgMaskDirective } from '../../../directives/rg-mask.directive';
import { ToastrService } from 'ngx-toastr';
import { LocatarioService } from '../../../services/locatario.service';
import { Router } from '@angular/router';
import { CurrencyMaskDirective } from '../../../directives/real.directive';
import { ProprietarioService } from '../../../services/proprietario.service';
import { ILocatarioContent } from '../../../Types/LocatarioResponse';
import { IContentProprietario } from '../../../Types/Proprietario';
@Component({
  selector: 'app-detalhes',
  imports: [
    MainContantComponent,
    HlmInputDirective,
    HlmLabelDirective,
    BrnSelectImports,
    HlmSelectImports,
    ButtonPreviewComponent,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    RgMaskDirective,
    CurrencyMaskDirective
  ],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesPropriedadeComponent implements OnInit {

  rua: string = '';
  numero!: number;
  bairro: string = '';
  cep: string = '';
  localizacao: string = '';
  aluguel: number = 0;
  dataPagamento: Date = new Date();
  proprietarioId: string = '';
  locatarioId: string = '';
  status: boolean = true;

  locatarios: ILocatarioContent[] = [];
  proprietarios: IContentProprietario[] = [];

  id: string = '';


  constructor(
    private fb: FormBuilder,
    private servicePropriedade: PropriedadeService,
    private toastr: ToastrService,
    private serviceProprietario: ProprietarioService,
    private serviceLocatario: LocatarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      rua: [this.rua, [Validators.required, Validators.minLength(6)]],
      numero: [this.numero, [Validators.required, Validators.minLength(11)]],
      bairro: [this.bairro, [Validators.required, Validators.minLength(1)]],
      cep: [this.cep, [Validators.required, Validators.minLength(11)]],
      localizacao: [this.localizacao, [Validators.required]],
      aluguel: ['', [Validators.required]],
      dataPagamento: [this.dataPagamento, [Validators.required]],
      proprietarioID: [null],
      status: [this.status, [Validators.required]],
    });

  }

  ngOnInit() {
    this.serviceProprietario.buscarProprietarios(0, true, '').subscribe({
      next: (response) => {
        this.proprietarios = response.content;
      },
      error: (error) => {

        console.log(error);
      }
    });
    this.serviceLocatario.buscarLocatarios(0, true, '').subscribe({
      next: (response) => {
        this.locatarios = response.content;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.buscarLocatario();
  }

  form: FormGroup;

  get selectedValue() {
    return this.form.get('propriedadeId')?.value;
  }

  salvar() {
    if (this.id) {
      this.servicePropriedade.atualizarPropriedade(this.id, this.form.value).subscribe({
        next: (response) => {
          if (this.form.valid) {
            this.toastr.success('Propriedade atualizada com sucesso', 'Atualizado!');
            this.form.reset();
            this.router.navigate(['/propriedade']);
          } else {
            this.toastr.success('Formulário inválido', 'Erro!');
          }
        },
        error: (error) => {
          this.toastr.error('Não foi possivel realizar o cadastro', 'Erro!');
          console.log(error);
        }
      })
    } else {
      
      let form = { ...this.form.value };

      form.aluguel = parseFloat(form.aluguel);
      
      console.log(form);
      
      // this.servicePropriedade.criarPropriedade(this.form.value).subscribe({
      //   next: (response) => {
      //     if (this.form.valid) {
      //       this.toastr.success('Propriedade cadastrada com sucesso', 'Cadastro!');
      //       this.form.reset();
      //       this.router.navigate(['/propriedade']);
      //     } else {
      //       this.toastr.success('Formulário inválido', 'Erro!');
      //     }
      //   },
      //   error: (error) => {
      //     this.toastr.error('Não foi possivel realizar o cadastro', 'Erro!');
      //     console.log(error);
      //   }
      // })
    }
  }

  buscarLocatario() {
    this.id = this.router.url.split("/")[3];
    if (this.id) {
      this.servicePropriedade.buscarPropriedade(this.id).subscribe({
        next: (response) => {
          this.form.patchValue(response);
        },
        error: (error) => {
          this.toastr.error('Não foi possivel realizar o cadastro', 'Erro!');
          console.log(error);
        }
      })
    }
  }
}
