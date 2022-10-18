import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseDeDatos } from 'src/data/Datos';
import { I_Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  obtenerCursosPromise(): Promise<I_Curso> | any {
    return new Promise((resolve, reject) => {
      if(BaseDeDatos.cursos.length > 0){
        resolve(BaseDeDatos.cursos);
      }else{
        reject({
          mensaje: 'No se encontraron cursos'
        });
      }
    });
  }

  cursos:I_Curso[]=BaseDeDatos.cursos;
  cursosSubject:BehaviorSubject<I_Curso[]>;
  cursosObservables!:Observable<I_Curso[]>;
  constructor() {
    this.cursosSubject = new BehaviorSubject<I_Curso[]>(this.cursos);
    this.cursosObservables=this.cursosSubject.asObservable(); 

  }
  agregarCurso(curso:I_Curso){
    this.cursos.push(curso);
    this.cursosSubject.next(this.cursos);
  }

  borrarCurso(id: number){
    let position = this.cursos.findIndex((curso) => curso.id == id);
    this.cursos.splice(position,1);
    this.cursosSubject.next(this.cursos);
  }

  modificarCurso(id:number, curso:I_Curso){
    let position = this.cursos.findIndex((curso) => curso.id == id);
    let newData = {
      ...curso,
      id: id,
    };
    this.cursos[position]=newData;
    this.cursosSubject.next(this.cursos);
  }
}
