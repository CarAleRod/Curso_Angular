import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { I_Curso } from 'src/app/models/curso';
import { CursosService } from 'src/app/services/cursos.service';
import { DatosCursoDialogComponent } from './datos-curso-dialog/datos-curso-dialog.component';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit, OnDestroy {
  subscripcion!:Subscription;
  columnas: string[] = [
    'nombre',
    'comision',
    'profesor',
    'fechaInicio',
    'fechaFin',
    'inscripcionAbierta',
    'acciones'
  ];
  dataSource: MatTableDataSource<I_Curso> = new MatTableDataSource<I_Curso>();

  constructor(private cursosService:CursosService, private dialog: MatDialog) {}
  
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.subscripcion=this.cursosService.cursosObservables.subscribe({
      next: (cursos: I_Curso[]) => {
        this.dataSource.data = cursos;
      },
      error: (error) => {
        console.error(error);
      }
    });
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

  borrar(id: number) {
    this.cursosService.borrarCurso(id);
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
    this.dataSource.filterPredicate = function (
      curso: I_Curso,
      filtro: string
    ) {
      return (
        curso.nombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        curso.comision.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())||
        curso.profesor.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
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
