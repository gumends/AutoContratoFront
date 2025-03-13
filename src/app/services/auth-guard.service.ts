import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IPages } from '../components/main-contant/main-contant.component';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private firstSegment: string;
  pages = IPages;

  permissoes: Record<string, string> = {
    "0": "ADMIN",
    "1": "USER"
  };

  constructor(private router: Router) {
    this.firstSegment = this.getFirstSegment();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = localStorage.getItem('auth-token');

    if (!authToken) {
      this.router.navigate(['/login']);
      return false;
    }


    let tokenDecoded: any;
    try {
      tokenDecoded = jwtDecode(authToken);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      this.router.navigate(['/login']);
      return false;
    }

    const permissaoUsuario = this.permissoes[tokenDecoded.permissao];

    if(authToken && permissaoUsuario === "ADMIN") {
      return true
    }

    if (!permissaoUsuario) {
      this.router.navigate(['/login']);
      return false;
    }

    const pagesRender = this.pages.filter(page => page.permissao === permissaoUsuario);
    const pageAcess = pagesRender.some(page => page.url === `/${this.firstSegment}`);

    if (state.url === '/dashboard' && !pageAcess) {
      this.router.navigate(['/login']);
      return false;
    }

    if (pageAcess || tokenDecoded.permissao === "0") {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }

  private getFirstSegment(): string {
    const path = window.location.pathname.split('/');
    return path.length > 1 ? path[1] : '';
  }
}
