import { Component } from '@angular/core';
import { MainLoginComponent } from "../../components/main-login/main-login.component";
import { LabelInputComponent } from "../../components/input/input.component";
import { ButtonPreviewComponent } from "../../components/button/button.component";
import { Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CpfMaskDirective } from '../../directives/cpf-mask.directive';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-register',
  imports: [
    MainLoginComponent,
    FormsModule,
    ButtonPreviewComponent,
    ReactiveFormsModule,
    CpfMaskDirective,
    HlmInputDirective,
    HlmLabelDirective
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @Input() nome: string = "";
  @Input() cpf: string = "";
  @Input() email: string = "";
  @Input() loginValue: string = "";
  @Input() senha: string = "";
  @Input() confSenha: string = "";

  @Input() showSonner: boolean = false;
  @Input() message: string = '';
  @Input() typeIcon: string = "";
  @Input() title: string = "";

  registerForm: FormGroup;

  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      senha: [this.senha, [Validators.required, Validators.minLength(6)]],
      email: [this.email, [Validators.required, Validators.email]],
      cpf: [this.cpf, [Validators.required, Validators.min(1)]],
      nome: [this.nome, [Validators.required]],
      confSenha: [this.confSenha, [Validators.required, Validators.minLength(6)]],
      permissao: "USER"
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.toastr.error('Confira os dados informados', 'Erro!');
      return;
    }

    if (this.registerForm.value.senha !== this.registerForm.value.confSenha) {
      this.registerForm.controls['confSenha'].setErrors({ mismatch: true });
      return;
    }

    // Criando um objeto sem a propriedade confSenha
    const formData = { ...this.registerForm.value };
    delete formData.confSenha;

    this.service.register(formData)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/home']);
          this.toastr.success('Registro realizado com sucesso', 'Bem vindo!');
        },
        error: (error) => {
          console.log(error);
          this.toastr.error('Dados já cadastrados', 'Erro!');
        }
      });
  }
}
