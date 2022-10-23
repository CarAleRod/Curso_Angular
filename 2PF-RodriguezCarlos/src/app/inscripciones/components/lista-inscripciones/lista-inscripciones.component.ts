import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { I_Inscripcion } from '../../models/inscripcion';
import { I_InscripcionConNombre } from '../../models/InscripcionConNombre';
import { InscripcionesService } from '../../services/inscripciones.service';
import { DatosInscripcionDialogComponent } from '../datos-inscripcion-dialog/datos-inscripcion-dialog.component';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css'],
})
export class ListaInscripcionesComponent implements OnInit, OnDestroy {
  subscripcion!: Subscription;
  columnas: string[] = [
    'cursoId',
    'cursoNombre',
    'alumnoId',
    'alumnoNombre',
    'acciones',
  ];
  dataSource: MatTableDataSource<I_InscripcionConNombre> =
    new MatTableDataSource<I_InscripcionConNombre>();

  constructor(
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.subscripcion =
      this.inscripcionesService.inscripcionesObservables.subscribe({
        next: (inscripciones: I_Inscripcion[]) => {
          let data: I_InscripcionConNombre[] = [];
          inscripciones.forEach((inscripcion) => {
            const curso = this.cursosService.cursos.find(
              (curso) => curso.id == inscripcion.cursoId
            );
            const alumno = this.alumnosService.alumnos.find(
              (alumno) => alumno.id == inscripcion.alumnoId
            );

            data.push({
              id: inscripcion.id,
              cursoId: inscripcion.cursoId,
              cursoNombre: curso!.nombre,
              alumnoId: inscripcion.alumnoId,
              alumnoNombre: alumno?.apellido + ' ' + alumno?.nombre,
            });
          });

          this.dataSource.data = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  editar(id: number) {
    let position = this.dataSource.data.findIndex(
      (inscripcion) => inscripcion.id == id
    );
    let inscripcionData = this.dataSource.data[position];

    let dialog = this.dialog.open(DatosInscripcionDialogComponent, {
      width: '50%',
      height: '80%',
      data: inscripcionData,
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        if (!this.inscripcionesService.existeInscripcion(res)) {
          this.inscripcionesService.modificarInscripcion(id, res);
        }
      }
    });
  }

  borrar(id: number) {
    this.inscripcionesService.borrarInscripcion(id);
  }
  openDialog() {
    let dialog = this.dialog.open(DatosInscripcionDialogComponent, {
      width: '50%',
      height: '80%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        if (!this.inscripcionesService.existeInscripcion(res)) {
          let newId: number = this.obtenerProximoId();
          let newData = {
            ...res,
            id: newId,
          };
          this.inscripcionesService.agregarInscripcion(newData);
        }
      }
    });
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      inscripcion: I_InscripcionConNombre,
      filtro: string
    ) {
      return (
        inscripcion.cursoNombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        inscripcion.alumnoNombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase())
      );
    };
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  obtenerProximoId() {
    let maxId: number = 0;
    this.dataSource.data.forEach((inscripcion) => {
      if (inscripcion.id > maxId) {
        maxId = inscripcion.id;
      }
    });
    return maxId + 1;
  }
}
