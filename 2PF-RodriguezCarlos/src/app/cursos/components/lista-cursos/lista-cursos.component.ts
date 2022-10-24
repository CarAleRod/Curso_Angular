import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CursosService } from '../../services/cursos.service';
import { I_Curso } from '../../models/curso';
import { DatosCursoDialogComponent } from '../datos-curso-dialog/datos-curso-dialog.component';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
import { DetalleCursoDialogComponent } from '../detalle-curso-dialog/detalle-curso-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css'],
})
export class ListaCursosComponent implements OnInit, OnDestroy, AfterViewInit {
  subscripcion!: Subscription;

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
    private cursosService: CursosService,
    private inscripcionService: InscripcionesService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.subscripcion = this.cursosService.cursosObservables.subscribe({
      next: (cursos: I_Curso[]) => {
        this.dataSource.data = cursos;
      },
      error: (error) => {
        console.error(error);
      },
    });

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
        this.cursosService.modificarCurso(id, res);
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
    this.cursosService.borrarCurso(id);
    this.inscripcionService.borrarInscripcionesPorCurso(id);
  }
  openDialog() {
    let dialog = this.dialog.open(DatosCursoDialogComponent, {
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
        this.cursosService.agregarCurso(newData);
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
