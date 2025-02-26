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
import { IContent } from '../../../Types/propriedade';
import { NgFor } from '@angular/common';
import { CpfMaskDirective } from '../../../directives/cpf-mask.directive';
import { RgMaskDirective } from '../../../directives/rg-mask.directive';
import { ToastrService } from 'ngx-toastr';
import { LocatarioService } from '../../../services/locatario.service';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-detalhes',
  imports: [
    MainContantComponent,
    AppComponent,
    HlmInputDirective,
    HlmLabelDirective,
    BrnSelectImports,
    HlmSelectImports,
    ButtonPreviewComponent,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    CpfMaskDirective,
    RgMaskDirective,
    HlmButtonDirective,
    RouterLink
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
  propriedades: IContent[] = [];
  id: string = '';


  constructor(
    private fb: FormBuilder,
    private servicePropriedade: PropriedadeService,
    private toastr: ToastrService,
    private serviceLocatario: LocatarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: [this.nome, [Validators.required, Validators.minLength(6)]],
      cpf: [this.cpf, [Validators.required, Validators.minLength(11)]],
      nascimento: [this.nascimento, [Validators.required, Validators.minLength(1)]],
      rg: [this.rg, [Validators.required, Validators.minLength(11)]],
      status: [this.status, [Validators.required]],
      propriedadeId: [this.propriedadeId, [Validators.required]]
    });

  }

  ngOnInit() {
    this.servicePropriedade.getPropriedades().subscribe({
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
    if (this.id != '') {
      this.serviceLocatario.atualizar(this.id, this.form.value).subscribe({
        next: (response) => {
          if (this.form.valid) {
            this.toastr.success('Locatário atualizado com sucesso', 'Atualizado!');
            this.form.reset();
            this.router.navigate(['/locatario']);
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
      this.serviceLocatario.criarLocatario(this.form.value).subscribe({
        next: (response) => {
          if (this.form.valid) {
            this.toastr.success('Locatário cadastrado realizado com sucesso', 'Cadastro!');
            this.form.reset();
            this.router.navigate(['/locatario']);
          } else {
            this.toastr.success('Formulário inválido', 'Erro!');
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
      this.serviceLocatario.buscarLocatario(this.id).subscribe({
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
