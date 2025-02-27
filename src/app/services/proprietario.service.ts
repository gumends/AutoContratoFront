import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContentProprietario, IProprietarioResponse } from '../Types/Proprietario';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8080/proprietarios'
  token = localStorage.getItem('auth-token');

  buscarProprietarios(pagina: number, status: boolean, nome: string): Observable<IProprietarioResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}?status=${status}&nome=${nome}`, { headers }).pipe(
      map((response: any) => response as IProprietarioResponse)
    );
  }

  desativarProprietario(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.patch(`${this.baseUrl}/${id}/status`, null, { headers });
  }

  criarProprietario(proprietario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(`${this.baseUrl}`, proprietario, { headers });
  }

  alterarProprietario(id: string, proprietario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.patch(`${this.baseUrl}/${id}`, proprietario, { headers });
  }

  buscaProprietario(id: string): Observable<IContentProprietario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers }).pipe(
      map((response: any) => response as IContentProprietario)
    );
  }
}
