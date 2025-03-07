import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuarioContent, IUsuarioResponse } from '../Types/Usuario';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/usuarios'
  token = localStorage.getItem('auth-token');

  buscarUsuarios(pagina: number = 0, tamanho: number = 10, nome: string = ""): Observable<IUsuarioResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}?nome=${nome}&page=${pagina}&size=${tamanho}`, { headers }).pipe(
      map((response: any) => response as IUsuarioResponse)
    );
  }

  buscarUsuario(id: string): Observable<IUsuarioContent> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers }).pipe(
      map((response: any) => response as IUsuarioContent)
    );
  }

  atualizarUsuario(id: string, usuario: any): Observable<IUsuarioContent> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.patch<IUsuarioContent>(`${this.baseUrl}/${id}`, usuario, { headers });
  }

  deletarUsuario(id: string): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<string>(`${this.baseUrl}/${id}`, { headers });
  }
}
