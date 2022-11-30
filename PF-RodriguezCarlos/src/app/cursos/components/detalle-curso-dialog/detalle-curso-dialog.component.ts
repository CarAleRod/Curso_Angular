import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { I_Alumno } from 'src/app/alumnos/models/alumno';
import { I_AlumnoState } from 'src/app/alumnos/models/alumno.state';
import { I_AlumnoInscripcion } from 'src/app/alumnos/models/alumnoInscripcion';
import { cargarAlumnos } from 'src/app/alumnos/state/alumnos.actions';
import { selectAlumnos } from 'src/app/alumnos/state/alumnos.selectors';
import { I_InscripcionState } from 'src/app/inscripciones/models/inscripcion.state';
import {
  cargarInscripciones,
  eliminarInscripcion,
} from 'src/app/inscripciones/state/inscripciones.actions';
import { selectInscripciones } from 'src/app/inscripciones/state/inscripciones.selectors';
import { I_Curso } from '../../models/curso';

@Component({
  selector: 'app-detalle-curso-dialog',
  templateUrl: './detalle-curso-dialog.component.html',
  styleUrls: ['./detalle-curso-dialog.component.css'],
})
export class DetalleCursoDialogComponent implements OnInit, OnDestroy {
  subscripcion!: Subscription;
  curso!: I_Curso;
  columnas: string[] = [
    'nombre',
    'edad',
    'genero',
    'fechaDeIngreso',
    'acciones',
  ];
  dataSource: MatTableDataSource<I_AlumnoInscripcion> =
    new MatTableDataSource<I_AlumnoInscripcion>();

  constructor(
    private storeInscripciones: Store<I_InscripcionState>,
    private storeAlumnos: Store<I_AlumnoState>,
    public dialogRef: MatDialogRef<DetalleCursoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: I_Curso
  ) {
    this.curso = data;
    this.storeInscripciones.dispatch(cargarInscripciones());
    this.storeAlumnos.dispatch(cargarAlumnos());
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
        next: (inscripciones) => {
          let inscripcionesDelCurso = inscripciones.filter(
            (inscripcion) => inscripcion.cursoId == this.curso.id
          );
          let data: I_AlumnoInscripcion[] = [];
          if (inscripcionesDelCurso.length > 0) {
            this.storeAlumnos.select(selectAlumnos).subscribe({
              next: (alumnos) => {
                data = [];
                inscripcionesDelCurso.forEach((inscripcion) => {
                  let ixAlum = alumnos.findIndex(
                    (alum) => alum.id == inscripcion.alumnoId
                  );
                  let alumno: I_Alumno = alumnos[ixAlum];
                  if (alumno) {
                    data.push({ ...alumno, inscripcionId: inscripcion.id });
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
      alumno: I_AlumnoInscripcion,
      filtro: string
    ) {
      return (
        alumno.nombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        alumno.apellido.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }
}
