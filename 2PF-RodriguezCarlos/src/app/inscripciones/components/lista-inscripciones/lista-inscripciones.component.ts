import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  formulario!: FormGroup;

  constructor(
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      filtroCurso: ['', []],
      filtroAlumno: ['', []],
    });
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
        } else {
          this.openSnackBar('Ya existe esta subscripción', 'Cancelado', 3000);
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
        } else {
          this.openSnackBar('Ya existe esta subscripción', 'Cancelado', 3000);
        }
      }
    });
  }

  filtrarCurso(event: Event) {
    const filtroAlum = this.formulario.controls['filtroAlumno'].value
      .trim()
      .toLocaleLowerCase();
    const valorFiltro = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    if (valorFiltro == '' && filtroAlum != '') {
      this.dataSource.filterPredicate = function (
        inscripcion: I_InscripcionConNombre,
        filtro: string
      ) {
        return inscripcion.alumnoNombre.toLocaleLowerCase().includes(filtro);
      };
      this.dataSource.filter = filtroAlum;
    } else {
      this.dataSource.filterPredicate = function (
        inscripcion: I_InscripcionConNombre,
        filtro: string
      ) {
        return (
          inscripcion.cursoNombre.toLocaleLowerCase().includes(filtro) &&
          inscripcion.alumnoNombre.toLocaleLowerCase().includes(filtroAlum)
        );
      };
      this.dataSource.filter = valorFiltro;
    }
  }

  filtrarAlumno(event: Event) {
    const filtroCurs = this.formulario.controls['filtroCurso'].value
      .trim()
      .toLocaleLowerCase();

    const valorFiltro = (event.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
    if (valorFiltro == '' && filtroCurs != '') {
      this.dataSource.filterPredicate = function (
        inscripcion: I_InscripcionConNombre,
        filtro: string
      ) {
        return inscripcion.cursoNombre.toLocaleLowerCase().includes(filtro);
      };
      this.dataSource.filter = filtroCurs;
    } else {
      this.dataSource.filterPredicate = function (
        inscripcion: I_InscripcionConNombre,
        filtro: string
      ) {
        return (
          inscripcion.cursoNombre.toLocaleLowerCase().includes(filtroCurs) &&
          inscripcion.alumnoNombre.toLocaleLowerCase().includes(filtro)
        );
      };
      this.dataSource.filter = valorFiltro;
    }
  }

  openSnackBar(message: string, action: string, duration: number) {
    if (duration && duration > 0) {
      this.matSnackBar.open(message, action, { duration: duration });
    } else {
      this.matSnackBar.open(message, action);
    }
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
