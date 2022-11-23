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
import { I_Curso } from '../../models/curso';
import { DatosCursoDialogComponent } from '../datos-curso-dialog/datos-curso-dialog.component';
import { DetalleCursoDialogComponent } from '../detalle-curso-dialog/detalle-curso-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { I_Sesion } from 'src/app/core/models/sesion';
import { Store } from '@ngrx/store';
import { I_CursoState } from '../../models/curso.state';
import { selectCursos } from '../../state/cursos.selectors';
import {
  agregarCurso,
  cargarCursos,
  editarCurso,
  eliminarCurso,
} from '../../state/cursos.actions';
import { selectSesion } from 'src/app/core/state/sesion.selectors';
import { cargarMenuActivo } from 'src/app/core/state/sesion.actions';
import { I_InscripcionState } from 'src/app/inscripciones/models/inscripcion.state';
import { borrarInscripcionPorCurso } from 'src/app/inscripciones/state/inscripciones.actions';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css'],
})
export class ListaCursosComponent implements OnInit, OnDestroy, AfterViewInit {
  subscripcion!: Subscription;
  sesion$!: Observable<I_Sesion>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas: string[] = [
    'nombre',
    'comision',
    'profesor',
    'fechaInicio',
    'fechaFin',
    'inscripcionAbierta',
    'acciones',
  ];
  dataSource: MatTableDataSource<I_Curso> = new MatTableDataSource<I_Curso>();

  constructor(
    private storeCursos: Store<I_CursoState>,
    private storeInscripciones: Store<I_InscripcionState>,
    private storeSesion: Store<I_Sesion>,
    private dialog: MatDialog
  ) {
    this.storeCursos.dispatch(cargarCursos());
  }
  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.storeSesion.dispatch(cargarMenuActivo({ menuActivo: 'Cursos' }));
    this.sesion$ = this.storeSesion.select(selectSesion);
    this.actualizarLista();

    this.dataSource.filterPredicate = function (
      curso: I_Curso,
      filtro: string
    ) {
      return (
        curso.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase()) ||
        curso.comision
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        curso.profesor.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
  }

  actualizarLista() {
    this.subscripcion = this.storeCursos.select(selectCursos).subscribe({
      next: (cursos: I_Curso[]) => {
        this.dataSource.data = cursos;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(id: number) {
    let position = this.dataSource.data.findIndex((curso) => curso.id == id);
    let cursoData = this.dataSource.data[position];

    let dialog = this.dialog.open(DatosCursoDialogComponent, {
      width: '50%',
      height: '80%',
      data: cursoData,
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        const newData: I_Curso = {
          ...res,
          id: id,
        };
        this.storeCursos.dispatch(editarCurso({ curso: newData }));
      }
    });
  }
  verDetalle(id: number) {
    {
      let position = this.dataSource.data.findIndex((curso) => curso.id == id);
      let cursoData = this.dataSource.data[position];

      let dialog = this.dialog.open(DetalleCursoDialogComponent, {
        width: '80%',
        height: '80%',
        data: cursoData,
      });
    }
  }

  borrar(id: number) {
    this.storeCursos.dispatch(eliminarCurso({ id: id }));
    this.storeInscripciones.dispatch(borrarInscripcionPorCurso({ id: id }));
  }

  openDialog() {
    let dialog = this.dialog.open(DatosCursoDialogComponent, {
      width: '50%',
      height: '80%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        let newId: number = this.obtenerProximoId();
        let newData: I_Curso = {
          ...res,
          id: newId,
        };
        this.storeCursos.dispatch(agregarCurso({ curso: newData }));
      }
    });
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  obtenerProximoId() {
    let maxId: number = 0;
    this.dataSource.data.forEach((curso) => {
      if (curso.id > maxId) {
        maxId = curso.id;
      }
    });
    return maxId + 1;
  }
}
