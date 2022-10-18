import { Component, OnInit } from '@angular/core';
import { I_Curso } from 'src/app/models/curso';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-lista-curso-promise',
  templateUrl: './lista-curso-promise.component.html',
  styleUrls: ['./lista-curso-promise.component.css'],
})
export class ListaCursoPromiseComponent implements OnInit {
  cursos!: I_Curso[];
  cursosPromise: any;

  constructor(private cursosService: CursosService) {
    this.cursosPromise = this.cursosService
      .obtenerCursosPromise()
      .then((valor: I_Curso[]) => {
        this.cursos = valor;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  ngOnInit(): void {}
}
