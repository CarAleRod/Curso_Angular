import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I_Inscripcion } from '../../models/inscripcion';
import { I_InscripcionConNombre } from '../../models/InscripcionConNombre';
import { DatosInscripcionDialogComponent } from '../datos-inscripcion-dialog/datos-inscripcion-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { I_Curso } from 'src/app/cursos/models/curso';
import { I_Alumno } from 'src/app/alumnos/models/alumno';
import { I_Sesion } from 'src/app/core/models/sesion';
import { Store } from '@ngrx/store';
import { cargarMenuActivo } from 'src/app/core/state/sesion.actions';
import { I_CursoState } from 'src/app/cursos/models/curso.state';
import { I_InscripcionState } from '../../models/inscripcion.state';
import { cargarCursos } from 'src/app/cursos/state/cursos.actions';
import { selectCursos } from 'src/app/cursos/state/cursos.selectors';
import { selectInscripciones } from '../../state/inscripciones.selectors';
import {
  agregarInscripcion,
  cargarInscripciones,
  editarInscripcion,
  eliminarInscripcion,
} from '../../state/inscripciones.actions';
import { I_AlumnoState } from 'src/app/alumnos/models/alumno.state';
import { selectAlumnos } from 'src/app/alumnos/state/alumnos.selectors';
import { cargarAlumnos } from 'src/app/alumnos/state/alumnos.actions';
import { selectSesion } from 'src/app/core/state/sesion.selectors';

@Component({
  selector: 'app-lista-inscripciones',
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.css'],
})
export class ListaInscripcionesComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  subscripcion!: Subscription;
  subscripcionAlumnos!: Subscription;
  cursos!: I_Curso[];
  alumnos!: I_Alumno[];
  sesion$!: Observable<I_Sesion>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
    private storeInscripciones: Store<I_InscripcionState>,
    private storeCursos: Store<I_CursoState>,
    private storeAlumnos: Store<I_AlumnoState>,
    private storeSesion: Store<I_Sesion>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar
  ) {
    this.storeCursos.dispatch(cargarCursos());
    this.storeAlumnos.dispatch(cargarAlumnos());
    this.storeInscripciones.dispatch(cargarInscripciones());
  }

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
    if (this.subscripcionAlumnos) {
      this.subscripcionAlumnos.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.sesion$ = this.storeSesion.select(selectSesion);
    this.storeSesion.dispatch(
      cargarMenuActivo({ menuActivo: 'Inscripciones' })
    );
    this.formulario = this.formBuilder.group({
      filtroCurso: ['', []],
      filtroAlumno: ['', []],
    });

    this.actualizarLista();
  }

  actualizarLista() {
    this.subscripcion = this.storeCursos
      .select(selectCursos)
      .subscribe((cursos: I_Curso[]) => {
        this.cursos = cursos;
        this.subscripcionAlumnos = this.storeAlumnos
          .select(selectAlumnos)
          .subscribe((alumnos: I_Alumno[]) => {
            this.alumnos = alumnos;

            this.subscripcion = this.storeInscripciones
              .select(selectInscripciones)
              .subscribe({
                next: (inscripciones: I_Inscripcion[]) => {
                  let data: I_InscripcionConNombre[] = [];
                  inscripciones.forEach((inscripcion) => {
                    let curso = this.cursos.find(
                      (curso2) => curso2.id == inscripcion.cursoId
                    );
                    let alumno = this.alumnos.find(
                      (alumno2) => alumno2.id == inscripcion.alumnoId
                    );
                    if (alumno && curso) {
                      data.push({
                        id: inscripcion.id,
                        cursoId: inscripcion.cursoId,
                        cursoNombre: curso!.nombre,
                        alumnoId: inscripcion.alumnoId,
                        alumnoNombre: alumno?.apellido + ' ' + alumno?.nombre,
                      });
                    }
                  });
                  this.dataSource.data = data;
                },
                error: (error) => {
                  console.error(error);
                },
              });
          });
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        const newData: I_Inscripcion = {
          ...res,
          id: id,
        };
        this.storeInscripciones.select(selectInscripciones).subscribe({
          next: (inscripciones: I_Inscripcion[]) => {
            let existeInsc = false;
            inscripciones.forEach((inscripcion) => {
              if (
                inscripcion.alumnoId == res.alumnoId &&
                inscripcion.cursoId == res.cursoId
              ) {
                existeInsc = true;
              }
            });
            if (!existeInsc) {
              this.storeInscripciones.dispatch(
                editarInscripcion({ inscripcion: newData })
              );
            } else {
              this.openSnackBar(
                'Ya existe esta subscripción',
                'Cancelado',
                3000
              );
            }
          },
        });
      }
    });
  }

  borrar(id: number) {
    this.storeInscripciones.dispatch(eliminarInscripcion({ id }));
  }
  openDialog() {
    let dialog = this.dialog.open(DatosInscripcionDialogComponent, {
      width: '50%',
      height: '80%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        this.storeInscripciones
          .select(selectInscripciones)
          .subscribe({
            next: (inscripciones: I_Inscripcion[]) => {
              let existeInsc = false;
              inscripciones.forEach((inscripcion) => {
                if (
                  inscripcion.alumnoId == res.alumnoId &&
                  inscripcion.cursoId == res.cursoId
                ) {
                  existeInsc = true;
                }
              });
              if (!existeInsc) {
                let newId: number = this.obtenerProximoId();
                let newData = {
                  ...res,
                  id: newId,
                };
                this.storeInscripciones.dispatch(
                  agregarInscripcion({ inscripcion: newData })
                );
              } else {
                this.openSnackBar(
                  'Ya existe esta subscripción',
                  'Cancelado',
                  3000
                );
              }
            },
          })
          .unsubscribe();
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
