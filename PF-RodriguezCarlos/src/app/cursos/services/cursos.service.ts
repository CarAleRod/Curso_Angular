import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { I_Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private http: HttpClient) {}

  obtenerCursos(): Observable<I_Curso[]> {
    return this.http
      .get<I_Curso[]>(`${environment.api}/cursos?` + Math.random())
      .pipe(catchError(this.manejarError));
  }

  agregarCurso(curso: I_Curso): Observable<I_Curso> {
    return this.http
      .post<I_Curso>(`${environment.api}/cursos/`, curso, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'UTF-8',
        }),
      })
      .pipe(catchError(this.manejarError));
  }

  borrarCurso(id: number): Observable<I_Curso> {
    return this.http
      .delete<I_Curso>(`${environment.api}/cursos/${id}`)
      .pipe(catchError(this.manejarError));
  }

  modificarCurso(id: number, curso: I_Curso): Observable<I_Curso> {
    return this.http
      .put<I_Curso>(`${environment.api}/cursos/${id}`, curso, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'UTF-8',
        }),
      })
      .pipe(catchError(this.manejarError));
  }

  private manejarError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('Error en el cliente', error.error.message);
    } else {
      console.warn('Error en el servidor', error.error.message);
    }

    return throwError(() => new Error('Error en la comunicacion HTTP'));
  }

  obtenerCurso(id: number): Observable<I_Curso> {
    return this.http
      .get<I_Curso>(`${environment.api}/cursos/${id}`)
      .pipe(catchError(this.manejarError));
  }
}
