import { Component } from '@angular/core';
import { MainLoginComponent } from "../../components/main-login/main-login.component";
import { LabelInputComponent } from "../../components/input/input.component";
import { ButtonPreviewComponent } from "../../components/button/button.component";
import { Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';


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
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      senha: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      idade: ["", [Validators.required, Validators.min(1)]],
      nome: ["", [Validators.required]],
      role: "USER"
    });
  }

  register() {

    if (this.registerForm.invalid) {
      this.toastr.success('Confira os dados informados', 'Erro!');
    }

    this.service.register(this.registerForm.value)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['/home']);
          this.toastr.success('Registro realizado com sucesso', 'Bem vindo!');
        },
        error: (error) => {
          console.log(error);
          this.toastr.success('Dados já cadastrados', 'Erro!');
        }
      })
  }
}
