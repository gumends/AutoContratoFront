import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ILocatarioPaginado } from '../Types/LocatarioResponse';

@Injectable({
  providedIn: 'root'
})
export class LocatarioService {

  baseUrl = 'http://localhost:8080/locatarios';
  token = localStorage.getItem('auth-token');

  constructor(private http: HttpClient) { }

  buscarLocatarios(pagina: number, tamanho: number, status?: boolean, nome: string = ''): Observable<ILocatarioPaginado> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}?pagina=${pagina}&tamanho=${tamanho}&status=${status}&nome=${nome}`, { headers })
      .pipe(
        map((response: any) => response as ILocatarioPaginado)
      );
  }
  desativarLocatario(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.patch(`${this.baseUrl}/${id}/status`, null, { headers });
  }

  criarLocatario(locatario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(`${this.baseUrl}`, locatario, { headers });
  }

  atualizarLocatario(locatario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put(`${this.baseUrl}/${locatario.id}`, locatario, { headers });
  }

  buscarLocatario(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  atualizar(id: string, locatario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.patch(`${this.baseUrl}/${id}`, locatario, { headers });
  }
}
