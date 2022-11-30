import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { I_CursoState } from 'src/app/cursos/models/curso.state';
import { I_CursoInscripcion } from 'src/app/cursos/models/cursoInscripcion';
import { cargarCursos } from 'src/app/cursos/state/cursos.actions';
import { selectCursos } from 'src/app/cursos/state/cursos.selectors';
import { I_Inscripcion } from 'src/app/inscripciones/models/inscripcion';
import { I_InscripcionState } from 'src/app/inscripciones/models/inscripcion.state';
import {
  cargarInscripciones,
  eliminarInscripcion,
} from 'src/app/inscripciones/state/inscripciones.actions';
import { selectInscripciones } from 'src/app/inscripciones/state/inscripciones.selectors';
import { I_Alumno } from '../../models/alumno';

@Component({
  selector: 'app-detalle-alumno-dialog',
  templateUrl: './detalle-alumno-dialog.component.html',
  styleUrls: ['./detalle-alumno-dialog.component.css'],
})
export class DetalleAlumnoDialogComponent implements OnInit, OnDestroy {
  subscripcion!: Subscription;
  alumno!: I_Alumno;
  columnas: string[] = [
    'nombre',
    'comision',
    'profesor',
    'fechaInicio',
    'fechaFin',
    'inscripcionAbierta',
    'acciones',
  ];
  dataSource: MatTableDataSource<I_CursoInscripcion> =
    new MatTableDataSource<I_CursoInscripcion>();
  constructor(
    private storeInscripciones: Store<I_InscripcionState>,
    private storeCursos: Store<I_CursoState>,
    public dialogRef: MatDialogRef<DetalleAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: I_Alumno
  ) {
    this.alumno = data;
    this.storeCursos.dispatch(cargarCursos());
    this.storeInscripciones.dispatch(cargarInscripciones());
  }

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.actualizarLista();
  }
  actualizarLista() {
    this.subscripcion = this.storeInscripciones
      .select(selectInscripciones)
      .subscribe({
        next: (inscripciones: I_Inscripcion[]) => {
          let inscripcionesDelAlumno = inscripciones.filter(
            (inscripcion) => inscripcion.alumnoId == this.alumno.id
          );
          let data: I_CursoInscripcion[] = [];
          if (inscripcionesDelAlumno.length > 0) {
            this.storeCursos.select(selectCursos).subscribe({
              next: (cursos) => {
                data = [];
                inscripcionesDelAlumno.forEach((inscripcion) => {
                  let cursoIx = cursos.findIndex(
                    (curso) => curso.id == inscripcion.cursoId
                  );
                  let curso = cursos[cursoIx];
                  if (curso) {
                    data.push({ ...curso, inscripcionId: inscripcion.id });
                  }
                });
                this.dataSource.data = data;
              },
            });
          } else {
            this.dataSource.data = data;
          }
        },
      });
  }

  borrar(inscripcionId: number) {
    this.storeInscripciones.dispatch(
      eliminarInscripcion({ id: inscripcionId })
    );
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      curso: I_CursoInscripcion,
      filtro: string
    ) {
      return curso.nombre
        .toLocaleLowerCase()
        .includes(filtro.toLocaleLowerCase());
    };
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }
}
