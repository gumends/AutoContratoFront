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

  login(login: string, senha: string){
    return this.http.post(`http://localhost:8080/auth/login`, { "login": login, "senha": senha }).pipe(
     tap((res: any) => {
       localStorage.setItem("auth-token", res.token)
     })
    )
  }

  private accountChangedSubject = new Subject<void>();
  accountChanged$ = this.accountChangedSubject.asObservable();

  register(nome: string, idade: string, email: string, login: string, senha: string){
    return this.http.post(`http://localhost:8080/auth/registrar`, { "nome": nome, "idade": idade, "email": email, "login": login, "senha": senha, "role": "USER" })
    .pipe(
      tap((res: any) => {
        console.log(res);
        
        localStorage.setItem("auth-token", res.token)
      })
    )
  }

  logout(){
    localStorage.removeItem("auth-token")
    this.router.navigate(['/login'])
  }

}
