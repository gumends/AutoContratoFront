

import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { PropriedadeService } from '../../services/propriedade.service';
import { ToastrService } from 'ngx-toastr';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { ProprietarioService } from '../../services/proprietario.service';
import { ButtonPreviewComponent } from "../../components/button/button.component";
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { CpfMaskDirective } from '../../directives/cpf-mask.directive';
import { RgMaskDirective } from '../../directives/rg-mask.directive';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-locatario',
  standalone: true,
  imports: [
    MainContantComponent,
    ReactiveFormsModule,
    FormsModule,
    HlmSelectImports,
    BrnSelectImports,
    HlmInputDirective,
    ButtonPreviewComponent,
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
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  form: FormGroup;
  id: string = "";

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private serviceUsuario: UsuarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(6)]],
      cpf: ["", [Validators.required]],
      email: ["", [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.id = this.router.url.split("/")[2];
    this.buscarUsuario();
  }

  atualizar() {
    this.serviceUsuario.atualizarUsuario(this.id, this.form.value).subscribe({
      next: (response) => {
        this.toastr.success('Usuário atualizado com sucesso', 'Sucesso');
        this.buscarUsuario();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  buscarUsuario() {
    this.serviceUsuario.buscarUsuario(this.id).subscribe({
      next: (response) => {
        this.form.patchValue(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}