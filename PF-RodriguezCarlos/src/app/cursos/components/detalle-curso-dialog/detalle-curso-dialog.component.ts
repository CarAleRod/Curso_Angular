import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { I_AlumnoInscripcion } from 'src/app/alumnos/models/alumnoInscripcion';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { I_Inscripcion } from 'src/app/inscripciones/models/inscripcion';
import { I_InscripcionState } from 'src/app/inscripciones/models/inscripcion.state';
import { eliminarInscripcion } from 'src/app/inscripciones/state/inscripciones.actions';
import { selectInscripciones } from 'src/app/inscripciones/state/inscripciones.selectors';
import { I_Curso } from '../../models/curso';

@Component({
  selector: 'app-detalle-curso-dialog',
  templateUrl: './detalle-curso-dialog.component.html',
  styleUrls: ['./detalle-curso-dialog.component.css'],
})
export class DetalleCursoDialogComponent implements OnInit {
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
    private alumnosService: AlumnosService,
    public dialogRef: MatDialogRef<DetalleCursoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: I_Curso
  ) {
    this.curso = data;
  }

  ngOnInit(): void {
    this.actualizarLista();
  }

  actualizarLista() {
    this.subscripcion = this.storeInscripciones
      .select(selectInscripciones)
      .subscribe({
        next: (inscripciones: I_Inscripcion[]) => {
          let data: I_AlumnoInscripcion[] = [];
          let inscripcionesDelCurso = inscripciones.filter(
            (inscripcion) => inscripcion.cursoId == this.curso.id
          );
          if (inscripcionesDelCurso.length > 0) {
            inscripcionesDelCurso.forEach((inscripcion) => {
              this.alumnosService
                .obtenerAlumno(inscripcion.alumnoId)
                .subscribe({
                  next: (alumno) => {
                    if (alumno) {
                      data.push({ ...alumno, inscripcionId: inscripcion.id });
                    }
                  },
                  complete: () => (this.dataSource.data = data),
                });
            });
          } else {
            this.dataSource.data = data;
          }
        },
        error: (error) => {
          console.error(error);
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
