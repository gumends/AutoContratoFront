import { Component, OnInit } from '@angular/core';
import { MainContantComponent } from "../../../components/main-contant/main-contant.component";
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { ButtonPreviewComponent } from "../../../components/button/button.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropriedadeService } from '../../../services/propriedade.service';
import { IPropriedadeContent } from '../../../Types/propriedade';
import { NgFor } from '@angular/common';
import { CpfMaskDirective } from '../../../directives/cpf-mask.directive';
import { RgMaskDirective } from '../../../directives/rg-mask.directive';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { ProprietarioService } from '../../../services/proprietario.service';
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
    CpfMaskDirective,
    RgMaskDirective
  ],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent implements OnInit {

  nome: string = '';
  cpf: string = '';
  nascimento!: Date;
  rg: string = '';
  propriedadeId: string = '';
  status!: boolean;
  propriedades: IPropriedadeContent[] = [];
  id: string = '';
  nacionalidade: string = '';

  constructor(
    private fb: FormBuilder,
    private servicePropriedade: PropriedadeService,
    private toastr: ToastrService,
    private serviceProprietario: ProprietarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: [this.nome, [Validators.required, Validators.minLength(6)]],
      cpf: [this.cpf, [Validators.required, Validators.minLength(11)]],
      nascimento: [this.nascimento, [Validators.required, Validators.minLength(1)]],
      rg: [this.rg, [Validators.required, Validators.minLength(11)]],
      nacionalidade: [this.nacionalidade, [Validators.required]],
      propriedadeId: [this.propriedadeId]
    });

  }

  ngOnInit() {
    this.servicePropriedade.buscarPropriedades().subscribe({
      next: (response) => {
        this.propriedades = response.content;
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
    if (this.id ) {
      this.serviceProprietario.alterarProprietario(this.id, this.form.value).subscribe({
        next: (response) => {
          if (this.form.valid) {
            this.toastr.success('Proprietario atualizado com sucesso', 'Atualizado!');
            this.form.reset();
            this.router.navigate(['/proprietario']);
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
      this.serviceProprietario.criarProprietario(this.form.value).subscribe({
        next: (response) => {
          if (this.form.valid) {
            this.toastr.success('Proprietario cadastrado realizado com sucesso', 'Cadastro!');
            this.form.reset();
            this.router.navigate(['/proprietario']);
          } else {
            this.toastr.error('Formulário inválido', 'Erro!');
          }
        },
        error: (error) => {
          this.toastr.error('Não foi possivel realizar o cadastro', 'Erro!');
          console.log(error);
        }
      })
    }
  }

  buscarLocatario() {
    this.id = this.router.url.split("/")[3];
    if (this.id) {
      this.serviceProprietario.buscaProprietario(this.id).subscribe({
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
