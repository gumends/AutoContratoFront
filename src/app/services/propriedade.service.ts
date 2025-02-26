import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPropriedadePaginado } from '../Types/propriedade';

@Injectable({
  providedIn: 'root'
})
export class PropriedadeService {

  constructor(private http: HttpClient) {

  }

  baseUrl = 'http://localhost:8080/propriedades'
  token = localStorage.getItem('auth-token');


  getPropriedades(): Observable<IPropriedadePaginado> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}`, { headers }).pipe(
      map((response: any) => response as IPropriedadePaginado)
    );
  }

}
