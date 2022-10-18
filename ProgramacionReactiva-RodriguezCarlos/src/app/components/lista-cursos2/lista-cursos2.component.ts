import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { I_Curso } from 'src/app/models/curso';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-lista-cursos2',
  templateUrl: './lista-cursos2.component.html',
  styleUrls: ['./lista-cursos2.component.css'],
})
export class ListaCursos2Component implements OnInit, OnDestroy {
  subscripcion!: Subscription;
  columnas: string[] = [
    'nombre',
    'comision',
    'profesor',
    'fechaInicio',
    'fechaFin',
    'inscripcionAbierta',
  ];
  dataSource: MatTableDataSource<I_Curso> = new MatTableDataSource<I_Curso>();

  constructor(private cursosService: CursosService) {}

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
  }
}
