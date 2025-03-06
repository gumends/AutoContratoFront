import { Component } from '@angular/core';
import { LabelInputComponent } from "../../components/input/input.component";
import { ButtonPreviewComponent } from "../../components/button/button.component";
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MainLoginComponent } from "../../components/main-login/main-login.component";
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  providers: [AuthService],
  imports: [ButtonPreviewComponent, FormsModule, LabelInputComponent, MainLoginComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginValue: string = '';
  passwordValue: string = '';
  loading: boolean = false
  loginForm: FormGroup;
  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      login: ["", [Validators.required, Validators.minLength(1)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });

  }

  login() {
    if (this.loginForm.invalid) {
      this.toastr.error('Preencha todos os campos corretamente.', 'Erro!');
      return;
    }

    this.loading = true;
    const { login, password } = this.loginForm.value;

    this.service.login(login, password).subscribe({
      next: (res: any) => {
          this.toastr.success('Login realizado com sucesso', 'Bem vindo!');
          setTimeout(() => {
            this.loading = false;
            window.location.href = '/home';
          }, 3000);
      },
      error: (error) => {
        if (error.status === 0) {
          this.loading = false;
          this.toastr.error('Servidor fora do ar', 'Erro!');
        }
        if (error.status === 401) {
          this.loading = false;
          this.toastr.error('Login ou senhsa inválidos', 'Erro!');
        }
      }
    });
  }
}
