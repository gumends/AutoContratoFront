import { Component, OnInit } from '@angular/core';
import { ThemeModeComponent } from "../theme-mode/theme-mode.component";
import { NgFor } from '@angular/common';
import { AppComponent } from "../icons/moon/moon.component";
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { DropdownPreviewComponent } from "../dropdown/dropdown.component";

@Component({
  selector: 'app-main-contant',
  imports: [ThemeModeComponent, NgFor, AppComponent, RouterModule, DropdownPreviewComponent],
  templateUrl: './main-contant.component.html',
  styleUrl: './main-contant.component.css'
})
export class MainContantComponent implements OnInit {

  constructor(private router: Router, private service: AuthService) { }

  page: string = "";
  pagesRender: any[] = [];

  pages = [
    {
      title: "Home",
      url: "/home",
      icon: "heroHomeSolid",
      role: "USER"
    },
    {
      title: "Locatarios",
      url: "/locatario",
      icon: "heroUserSolid",
      role: "USER"
    },
    {
      title: "Propriedades",
      url: "/propriedade",
      icon: "heroHomeModernSolid",
      role: "USER"
    },
    {
      title: "Proprietarios",
      url: "/proprietario",
      icon: "heroUserGroupSolid",
      role: "USER"
    },
    {
      title: "Usuarios",
      url: "/usuarios",
      icon: "heroUserSolid",
      role: "ADMIN"
    }
  ];

  title: string = ""

  token: string | null = localStorage.getItem("auth-token");
  tokenDecoded: any = this.token ? jwtDecode(this.token) : null;

  role = [
    "ADMIN",
    "USER"
  ]

  ngOnInit() {
    this.title = this.pages.find(p => p.url === this.router.url)?.title || "Undefined";
    if (this.tokenDecoded) {
      this.pagesRender = this.pages.filter((p) => p.role === this.role[this.tokenDecoded.role]);
      this.pagesRender.push(...this.pages.filter((p) => p.role === "USER"));
    } else {
      console.error('Token inválido ou não encontrado.');
    }
    this.page = this.router.url;
  }

  sair(){
    this.service.logout()
  }
}