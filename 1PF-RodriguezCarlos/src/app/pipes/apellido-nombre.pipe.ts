import { Pipe, PipeTransform } from '@angular/core';
import { I_Alumno } from 'src/models/alumno';

@Pipe({
  name: 'apellidoNombre',
})
export class ApellidoNombrePipe implements PipeTransform {
  transform(value: I_Alumno, ...args: number[]): string {
    if (args[0] == 0) {
      return value.nombre + ' ' + value.apellido;
    }
    return value.apellido + ', ' + value.nombre;
  }
}
