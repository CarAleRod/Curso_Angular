import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { I_Alumno } from '../../models/alumno';
import { DatosAlumnoDialogComponent } from '../datos-alumno-dialog/datos-alumno-dialog.component';
import { DetalleAlumnoDialogComponent } from '../detalle-alumno-dialog/detalle-alumno-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { I_Sesion } from 'src/app/core/models/sesion';
import { Store } from '@ngrx/store';
import { cargarMenuActivo } from 'src/app/core/state/sesion.actions';
import { selectSesion } from 'src/app/core/state/sesion.selectors';
import { I_AlumnoState } from '../../models/alumno.state';
import {
  agregarAlumno,
  cargarAlumnos,
  editarAlumno,
  eliminarAlumno,
} from '../../state/alumnos.actions';
import { selectAlumnos } from '../../state/alumnos.selectors';
import { I_InscripcionState } from 'src/app/inscripciones/models/inscripcion.state';
import { borrarInscripcionPorAlumno } from 'src/app/inscripciones/state/inscripciones.actions';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent implements OnInit, OnDestroy, AfterViewInit {
  subscripcion!: Subscription;
  sesion$!: Observable<I_Sesion>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas: string[] = [
    'nombre',
    'edad',
    'genero',
    'fechaDeIngreso',
    'acciones',
  ];
  dataSource: MatTableDataSource<I_Alumno> = new MatTableDataSource<I_Alumno>();

  constructor(
    private storeAlumnos: Store<I_AlumnoState>,
    private storeInscripciones: Store<I_InscripcionState>,
    private storeSesion: Store<I_Sesion>,
    private dialog: MatDialog
  ) {
    this.storeAlumnos.dispatch(cargarAlumnos());
  }

  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSesion.dispatch(cargarMenuActivo({ menuActivo: 'Alumnos' }));
    this.sesion$ = this.storeSesion.select(selectSesion);
    this.actualizarLista();

    this.dataSource.filterPredicate = function (
      alumno: I_Alumno,
      filtro: string
    ) {
      return (
        alumno.nombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        alumno.apellido.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
  }

  actualizarLista() {
    this.subscripcion = this.storeAlumnos.select(selectAlumnos).subscribe({
      next: (alumnos: I_Alumno[]) => {
        this.dataSource.data = alumnos;
      },
      error: (error) => {
        alert('hubo un error al obtener los alumnos: ' + error.message);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(id: number) {
    let position = this.dataSource.data.findIndex((alumno) => alumno.id == id);
    let alumnoData = this.dataSource.data[position];

    let dialog = this.dialog.open(DatosAlumnoDialogComponent, {
      width: '50%',
      height: '80%',
      data: alumnoData,
    });
    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        const newData: I_Alumno = {
          ...res,
          id: id,
        };
        this.storeAlumnos.dispatch(editarAlumno({ alumno: newData }));
      }
    });
  }
  verDetalle(id: number) {
    {
      let position = this.dataSource.data.findIndex(
        (alumno) => alumno.id == id
      );
      let alumnoData = this.dataSource.data[position];

      let dialog = this.dialog.open(DetalleAlumnoDialogComponent, {
        width: '80%',
        height: '80%',
        data: alumnoData,
      });
    }
  }

  borrar(id: number) {
    this.storeAlumnos.dispatch(eliminarAlumno({ id }));
    this.storeInscripciones.dispatch(borrarInscripcionPorAlumno({ id }));
  }
  openDialog() {
    let dialog = this.dialog.open(DatosAlumnoDialogComponent, {
      width: '50%',
      height: '80%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        let newId: number = this.obtenerProximoId();
        let newData = {
          ...res,
          id: newId,
        };
        newData.fechaDeIngreso = new Date();
        this.storeAlumnos.dispatch(agregarAlumno({ alumno: newData }));
      }
    });
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  obtenerProximoId() {
    let maxId: number = 0;
    this.dataSource.data.forEach((alumno) => {
      if (alumno.id > maxId) {
        maxId = alumno.id;
      }
    });
    return maxId + 1;
  }
}
