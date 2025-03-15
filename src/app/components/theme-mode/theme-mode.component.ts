import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { AppComponent } from "../icon/icon.component";

@Component({
  selector: 'app-theme-mode',
  imports: [AppComponent],
  templateUrl: './theme-mode.component.html',
  styleUrls: ['./theme-mode.component.css'],
})
export class ThemeModeComponent {
  constructor(private themeService: ThemeService) {}

  typeIcon: string = "heroMoonSolid";
  localstorege: Storage = localStorage;
  theme: string = "";

  ngOnInit() {
    this.theme = this.localstorege.getItem('theme')?.toString() || "light";
    this.theme === "dark" ? this.typeIcon = "heroSunSolid" : this.typeIcon = "heroMoonSolid";
  }
  toggleTheme(): void {
    this.typeIcon === "heroMoonSolid" ? this.typeIcon = "heroSunSolid" : this.typeIcon = "heroMoonSolid";
    this.themeService.toggleTheme();
  }
}
