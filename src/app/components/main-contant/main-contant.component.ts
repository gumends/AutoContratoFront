import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ThemeModeComponent } from "../theme-mode/theme-mode.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AppComponent } from "../icon/icon.component";
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { DropdownPreviewComponent } from "../dropdown/dropdown.component";
import {
  HlmBreadcrumbDirective,
  HlmBreadcrumbItemDirective,
  HlmBreadcrumbListDirective,
  HlmBreadcrumbPageDirective,
  HlmBreadcrumbSeparatorComponent,

} from '@spartan-ng/ui-breadcrumb-helm';
import { PesquisaComponent } from "../pesquisa/pesquisa.component";
import { TooltipComponent } from "../tooltip/tooltip.component";
import { BrnAlertDialogContentDirective, BrnAlertDialogTriggerDirective } from '@spartan-ng/brain/alert-dialog';
import { HlmAlertDialogComponent, HlmAlertDialogContentComponent, HlmAlertDialogHeaderComponent } from '@spartan-ng/ui-alertdialog-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

export const IPages = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "featherTrendingUp",
    permissao: "USER"
  },
  {
    title: "Locatários",
    url: "/locatario",
    icon: "heroUserSolid",
    permissao: "USER"
  },
  {
    title: "Propriedades",
    url: "/propriedade",
    icon: "heroHomeModernSolid",
    permissao: "USER"
  },
  {
    title: "Proprietários",
    url: "/proprietario",
    icon: "heroUserGroupSolid",
    permissao: "USER"
  },
  {
    title: "Usuários",
    url: "/usuarios",
    icon: "heroIdentificationSolid",
    permissao: "ADMIN"
  }
];


@Component({
  selector: 'app-main-contant',
  imports: [
    ThemeModeComponent,
    NgClass,
    NgFor,
    NgIf,
    NgClass,
    AppComponent,
    RouterModule,
    DropdownPreviewComponent,
    HlmBreadcrumbDirective,
    HlmBreadcrumbItemDirective,
    HlmBreadcrumbListDirective,
    HlmBreadcrumbPageDirective,
    HlmBreadcrumbSeparatorComponent,
    PesquisaComponent,
    TooltipComponent,

    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogContentComponent,

    HlmButtonDirective,
],
  templateUrl: './main-contant.component.html',
  styleUrl: './main-contant.component.css'
})
export class MainContantComponent implements OnInit {

  constructor(private router: Router, private service: AuthService) { }

  page: string = "";
  pagesRender: any[] = [];
  menu: boolean = true
  pages = IPages
  isMobile: boolean = false;

  title: string = ""
  token: string | null = localStorage.getItem("auth-token");
  tokenDecoded: any = this.token ? jwtDecode(this.token) : null;
  @Input() titulo: string = ""

  permissao = [
    "ADMIN",
    "USER"
  ]

  rotas: any[] = []

  showTooltip(page: any) {
    page.showTooltip = true;
  }

  hideTooltip(page: any) {
    page.showTooltip = false;
  }

  ngOnInit() {
    this.rotas = this.router.url
      .split("/")
      .filter(rotas => rotas !== "")
      .map((rota, index, array) => ({
        label: rota,
        url: "/" + array.slice(0, index + 1).join("/")
      }));
      this.isMobile = window.innerWidth <= 940;
    if (this.tokenDecoded) {
      if (this.tokenDecoded.permissao === 0) {
        this.pagesRender = this.pages;
      } else if (this.tokenDecoded.permissao === 1) {
        this.pagesRender = this.pages.filter(page => page.permissao === "USER");
      }
    } else {
      console.error('Token inválido ou não encontrado.');
    }
    this.page = this.router.url;
    this.menu = localStorage.getItem("menu") === "false" ? true : false
  }

  menuToggle() {
    localStorage.setItem("menu", this.menu.toString())
    this.menu = !this.menu
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth <= 940;
  }

  sair() {
    this.service.logout()
  }
}