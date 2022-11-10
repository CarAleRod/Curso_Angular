import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { I_CursoInscripcion } from 'src/app/cursos/models/cursoInscripcion';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { I_Inscripcion } from 'src/app/inscripciones/models/inscripcion';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
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
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    public dialogRef: MatDialogRef<DetalleAlumnoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: I_Alumno
  ) {
    this.alumno = data;
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
    this.subscripcion = this.inscripcionesService
      .obtenerInscripciones()
      .subscribe({
        next: (inscripciones: I_Inscripcion[]) => {
          let data: I_CursoInscripcion[] = [];
          let inscripcionesDelAlumno = inscripciones.filter(
            (inscripcion) => inscripcion.alumnoId == this.alumno.id
          );
          if (inscripcionesDelAlumno.length > 0) {
            inscripcionesDelAlumno.forEach((inscripcion) => {
              this.cursosService.obtenerCurso(inscripcion.cursoId).subscribe({
                next: (curso) => {
                  if (curso) {
                    data.push({ ...curso, inscripcionId: inscripcion.id });
                  }
                },
                complete: () => {
                  this.dataSource.data = data;
                },
              });
            });
          } else {
            this.dataSource.data = data;
          }
        },
        error: (error) => {
          alert('hubo un error al obtener las inscripciones: ' + error.message);
        },
      });
  }

  borrar(inscripcionId: number) {
    this.inscripcionesService
      .borrarInscripcion(inscripcionId)
      .subscribe((inscripciones) => {
        this.actualizarLista();
      });
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
