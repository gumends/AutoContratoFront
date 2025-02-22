
import { Component, OnInit } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  lucideCircleUser,
  lucideLayers,
  lucideMessageSquare,
  lucideCode,
  lucideMail,
  lucideLogOut,
  lucideSmile,
  lucideCog,
  lucideGithub,
  lucideKeyboard,
  lucideUser,
  lucidePlus,
  lucideCirclePlus,
  lucideCircleHelp,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
} from '@spartan-ng/ui-menu-helm';
import { AppComponent } from "../icons/moon/moon.component";
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Jwt } from '../../Types/jwt';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'spartan-dropdown-preview',
  standalone: true,
  imports: [
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,
    HlmButtonDirective,
    AppComponent,
    RouterLink
  ],
  providers: [
    provideIcons({
      lucideUser,
      lucideLayers,
      lucideCog,
      lucideKeyboard,
      lucideCircleUser,
      lucideSmile,
      lucidePlus,
      lucideGithub,
      lucideCircleHelp,
      lucideCode,
      lucideLogOut,
      lucideMail,
      lucideMessageSquare,
      lucideCirclePlus,
    }),
  ],
  templateUrl: './dropdown.component.html',
})
export class DropdownPreviewComponent implements OnInit{

  constructor(
    private service: AuthService,
    private toastr: ToastrService
  ) { }

  token!: string;
  exp!: string;
  decodedToken!: Jwt;
  nome!: string;
  email!: string;
  id!: string;
  role!: string;

  modelRole = [
    "ADMIN",
    "USER"
  ]
  
  ngOnInit(): void {
    this.token = localStorage.getItem('auth-token') as string;

    this.decodedToken = jwtDecode(this.token)

    this.id = this.decodedToken.id
    this.email = this.decodedToken.email
    this.role = this.modelRole[this.decodedToken.role]
    this.nome = this.decodedToken.nome
    
    if (this.token) {
      this.exp = JSON.parse(atob(this.token.split('.')[1])).exp
      if (parseInt(this.exp) < Date.now() / 1000) {
        this.logout()
      }
    }    
  }

  logout() {
    this.toastr.info('Saida realizada com sucesso', 'Ate logo!')
    setTimeout(() => {
      this.service.logout()
    }, 3000)
  }
}
