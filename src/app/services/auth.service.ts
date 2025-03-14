import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  baseUrl = "http://localhost:8080/auth";

  login(dados: any) {
    return this.http.post(`http://localhost:8080/auth/login`, dados).pipe(
      tap((res: any) => {
        localStorage.setItem("auth-token", res.token)
      })
    )
  }

  private accountChangedSubject = new Subject<void>();
  accountChanged$ = this.accountChangedSubject.asObservable();

  register(registro: any) {
    return this.http.post(`http://localhost:8080/auth/registrar`, registro)
      .pipe(
        tap((res: any) => {
          this.router.navigate(['/login'])
        })
      )
  }

  logout() {
    localStorage.removeItem("auth-token")
    this.router.navigate(['/login'])
  }

}
