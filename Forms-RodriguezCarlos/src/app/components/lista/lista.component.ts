import { Component, Input, OnInit } from '@angular/core';
import { IAlumno } from 'src/app/model/i-alumno';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @Input() Alumnos:IAlumno[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
