import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { I_Alumno } from 'src/app/alumnos/models/alumno';
import { I_AlumnoInscripcion } from 'src/app/alumnos/models/alumnoInscripcion';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { I_Inscripcion } from 'src/app/inscripciones/models/inscripcion';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
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
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    public dialogRef: MatDialogRef<DetalleCursoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: I_Curso
  ) {
    this.curso = data;
  }

  ngOnInit(): void {
    this.subscripcion =
      this.inscripcionesService.inscripcionesObservables.subscribe({
        next: (inscripciones: I_Inscripcion[]) => {
          let data: I_AlumnoInscripcion[] = [];
          let inscripcionesDelCurso = inscripciones.filter(
            (inscripcion) => inscripcion.cursoId == this.curso.id
          );
          inscripcionesDelCurso.forEach((inscripcion) => {
            const alumno = this.alumnosService.alumnos.find(
              (alumno: I_Alumno) => alumno.id == inscripcion.alumnoId
            );
            if (alumno) {
              data.push({ ...alumno, inscripcionId: inscripcion.id });
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
