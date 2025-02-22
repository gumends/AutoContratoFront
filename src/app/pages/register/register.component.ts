import { Component } from '@angular/core';
import { MainLoginComponent } from "../../components/main-login/main-login.component";
import { LabelInputComponent } from "../../components/input/input.component";
import { ButtonPreviewComponent } from "../../components/button/button.component";
import { Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  imports: [MainLoginComponent, FormsModule, LabelInputComponent, ButtonPreviewComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @Input() nome!: string;
  @Input() idade!: string;
  @Input() email!: string;
  @Input() loginValue: string = "";
  @Input() passwordValue: string = "";

  @Input() showSonner: boolean = false;
  @Input() message: string = '';
  @Input() typeIcon: string = "";
  @Input() title: string = "";

  registerForm: FormGroup;

  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      login: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      idade: ["", [Validators.required, Validators.min(1)]],
      nome: ["", [Validators.required]]
    });
  }

  register() {

    if (this.registerForm.invalid) {
      this.toastr.success('Confira os dados informados', 'Erro!');
    }

    this.service.register(this.nome, this.idade, this.email, this.loginValue, this.passwordValue)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success('Registro realizado com sucesso', 'Bem vindo!');
        },
        error: (error) => {
          console.log(error);
          this.toastr.success('Dados já cadastrados', 'Erro!');
        }
      })
  }
}
