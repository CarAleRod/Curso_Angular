import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { I_Curso } from 'src/app/models/curso';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-lista-cursos-pipeasync',
  templateUrl: './lista-cursos-pipeasync.component.html',
  styleUrls: ['./lista-cursos-pipeasync.component.css'],
})
export class ListaCursosPipeasyncComponent implements OnInit {
  cursoObservable$!: Observable<I_Curso[]>;
  constructor(private cursosService: CursosService) {}

  ngOnInit(): void {
    this.cursoObservable$ = this.cursosService.cursosObservables;
  }
  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.cursoObservable$ = this.cursosService.cursosObservables.pipe(
      map((cursos: I_Curso[]) =>
        cursos.filter(
          (curso: I_Curso) =>
            curso.nombre
              .toLocaleLowerCase()
              .includes(valorFiltro.toLocaleLowerCase()) ||
            curso.comision
              .toLocaleLowerCase()
              .includes(valorFiltro.toLocaleLowerCase()) ||
            curso.profesor
              .toLocaleLowerCase()
              .includes(valorFiltro.toLocaleLowerCase())
        )
      )
    );
  }
}
