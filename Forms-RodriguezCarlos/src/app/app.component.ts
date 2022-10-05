import { Component } from '@angular/core';
import { IAlumno } from './model/i-alumno';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alumnos:IAlumno[]=[];

  title = 'Forms-RodriguezCarlos';

  agregarAlumnoInRoot($event: IAlumno): void{
    this.alumnos.push($event);

  }
}
