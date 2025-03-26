import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8000/api/login';

  inicio(data: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}`, data, { headers });
  }

}
