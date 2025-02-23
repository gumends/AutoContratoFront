import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ILocatarioPaginado } from '../Types/LocatarioResponse';

@Injectable({
  providedIn: 'root'
})
export class LocatarioService {

  baseUrl = 'http://localhost:8080/locatario';
  token = localStorage.getItem('auth-token');

  constructor(private http: HttpClient) { }

  getLocatarios( pagina: number): Observable<ILocatarioPaginado> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}/todos?page=${pagina}`, { headers })
      .pipe(
        map((response: any) => response as ILocatarioPaginado)
      );
  }
}
