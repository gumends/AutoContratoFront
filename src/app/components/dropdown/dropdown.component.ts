
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

@Component({
  selector: 'spartan-dropdown-preview',
  standalone: true,
  imports: [
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuGroupComponent,
    HlmButtonDirective,
    AppComponent
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
  
  ngOnInit(): void {
    this.token = localStorage.getItem('auth-token') as string;

    console.log(this.token);

    if (this.token) {
      this.exp = JSON.parse(atob(this.token.split('.')[1])).exp
      if (parseInt(this.exp) < Date.now() / 1000) {
        this.logout()
      }
    }
  }

  logout() {
    this.toastr.info('Logout realizado com sucesso', 'Ate logo!')
    setTimeout(() => {
      this.service.logout()
    }, 3000)
  }
}
