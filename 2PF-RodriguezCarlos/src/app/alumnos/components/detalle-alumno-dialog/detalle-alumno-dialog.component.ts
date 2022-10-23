import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { I_Curso } from 'src/app/cursos/models/curso';
import { I_CursoInscripcion } from 'src/app/cursos/models/cursoInscripcion';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { I_Inscripcion } from 'src/app/inscripciones/models/inscripcion';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
import { I_Alumno } from '../../models/alumno';
import { I_AlumnoInscripcion } from '../../models/alumnoInscripcion';

@Component({
  selector: 'app-detalle-alumno-dialog',
  templateUrl: './detalle-alumno-dialog.component.html',
  styleUrls: ['./detalle-alumno-dialog.component.css'],
})
export class DetalleAlumnoDialogComponent implements OnInit {
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

  ngOnInit(): void {
    this.subscripcion =
      this.inscripcionesService.inscripcionesObservables.subscribe({
        next: (inscripciones: I_Inscripcion[]) => {
          let data: I_CursoInscripcion[] = [];
          let inscripcionesDelCurso = inscripciones.filter(
            (inscripcion) => inscripcion.alumnoId == this.alumno.id
          );
          inscripcionesDelCurso.forEach((inscripcion) => {
            const curso = this.cursosService.cursos.find(
              (curso: I_Curso) => curso.id == inscripcion.cursoId
            );
            if (curso) {
              data.push({ ...curso, inscripcionId: inscripcion.id });
            }
          });

          this.dataSource.data = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  borrar(inscripcionId: number) {
    this.inscripcionesService.borrarInscripcion(inscripcionId);
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
