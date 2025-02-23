import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPropriedade } from '../Types/propriedade';

@Injectable({
  providedIn: 'root'
})
export class PropriedadeService {

  constructor(private http: HttpClient) {

  }

  baseUrl = 'http://localhost:8080/propriedade'
  token = localStorage.getItem('auth-token');


  getPropriedades(): Observable<IPropriedade> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get(`${this.baseUrl}/todos`, { headers }).pipe(
      map((response: any) => response as IPropriedade)
    );
  }

}
