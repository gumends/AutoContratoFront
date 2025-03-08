import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPropriedadeContent, IPropriedadePaginado } from '../Types/propriedade';
import { IContentProprietario } from '../Types/Proprietario';

@Injectable({
  providedIn: 'root'
})
export class PropriedadeService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/propriedades'
  token = localStorage.getItem('auth-token');


  buscarPropriedades(status: boolean = true, rua: string = ''): Observable<IPropriedadePaginado> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}?status=${status}&rua=${rua}`, { headers }).pipe(
      map((response: any) => response as IPropriedadePaginado)
    );
  }

  desativarPropriedade(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.patch(`${this.baseUrl}${id}/status`, null, { headers });
  }

  criarPropriedade(propriedade: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(`${this.baseUrl}`, propriedade, { headers });
  }

  buscarPropriedade(id: string): Observable<IPropriedadeContent> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers }).pipe(
      map((response: any) => response as IPropriedadeContent)
    );
  }

  atualizarPropriedade(id: string, propriedade: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.patch(`${this.baseUrl}/${id}`, propriedade, { headers });
  }
  
  buscaAluguel(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}/aluguel`, { headers });
  } 
}
