import { Component } from '@angular/core';
import { ThemeModeComponent } from "../theme-mode/theme-mode.component";

@Component({
  selector: 'app-main-login',
  imports: [ThemeModeComponent],
  templateUrl: './main-login.component.html',
  styleUrl: './main-login.component.css'
})
export class MainLoginComponent {

  loginValue: string = '';
  passwordValue: string = '';
  showSonner: boolean = false
  typeIcon: string = ""
  title: string = ""
  message: string = ""
}
