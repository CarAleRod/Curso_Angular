import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { I_Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  constructor(private http: HttpClient) {}

  agregarAlumno(alumno: I_Alumno): Observable<I_Alumno> {
    return this.http
      .post<I_Alumno>(`${environment.api}/alumnos/`, alumno, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'UTF-8',
        }),
      })
      .pipe(catchError(this.manejarError));
  }

  obtenerAlumnos(): Observable<I_Alumno[]> {
    return this.http
      .get<I_Alumno[]>(`${environment.api}/alumnos?` + Math.random())
      .pipe(catchError(this.manejarError));
  }

  borrarAlumno(id: number): Observable<I_Alumno> {
    return this.http
      .delete<I_Alumno>(`${environment.api}/alumnos/${id}`)
      .pipe(catchError(this.manejarError));
  }

  modificarAlumno(id: number, alumno: I_Alumno): Observable<I_Alumno> {
    return this.http
      .put<I_Alumno>(`${environment.api}/alumnos/${id}`, alumno, {
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

  obtenerAlumno(id: number): Observable<I_Alumno> {
    return this.http
      .get<I_Alumno>(`${environment.api}/alumnos/${id}`)
      .pipe(catchError(this.manejarError));
  }
}
