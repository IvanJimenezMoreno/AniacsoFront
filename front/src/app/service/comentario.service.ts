import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = 'http://127.0.0.1:8000/api/comentarios'; // Reemplaza con la URL de tu API
  private usuarioApiUrl = 'http://127.0.0.1:8000/api/usuarios'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener todos los comentarios
  getComentarios(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      switchMap(comentarios => {
        return this.addApodosToComentarios(comentarios, token);
      })
    );
  }

  // Método para crear un nuevo comentario
  createComentario(contenido: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, { contenido }, { headers });
  }

  // Método para obtener el apodo de un usuario por su ID
  private getApodoById(usuarioId: number, token: string): Observable<string> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.usuarioApiUrl}/${usuarioId}/apodo`, { headers }).pipe(
      map(response => response.apodo)
    );
  }

  // Método para agregar apodos a los comentarios
  private addApodosToComentarios(comentarios: any[], token: string): Observable<any[]> {
    const comentariosConApodos$ = comentarios.map(comentario => {
      return this.getApodoById(comentario.usuario_id, token).pipe(
        map(apodo => {
          comentario.apodo = apodo;
          return comentario;
        })
      );
    });
    return forkJoin(comentariosConApodos$);
  }
}