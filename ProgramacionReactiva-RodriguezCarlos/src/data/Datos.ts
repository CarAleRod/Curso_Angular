import { I_Curso } from "src/app/models/curso";

export class BaseDeDatos{
    static cursos: I_Curso[] = [
      {
        id:1,
        nombre: 'Angular',
        comision: '32310',
        profesor: 'Keven',
        fechaInicio: new Date(2022, 0, 1),
        fechaFin: new Date(2022, 1, 28),
        inscripcionAbierta: 'Si',
      },
      {
        id:2,
        nombre: 'Angular',
        comision: '32320',
        profesor: 'Fernando',
        fechaInicio: new Date(2022, 2, 1),
        fechaFin: new Date(2022, 3, 30),
        inscripcionAbierta: 'Si',
      },
      {
        id:3,
        nombre: 'ReactJS',
        comision: '33310',
        profesor: 'Arturo',
        fechaInicio: new Date(2022, 1, 1),
        fechaFin: new Date(2022, 3, 28),
        inscripcionAbierta: 'No',
      },
      {
        id:4,
        nombre: 'VueJS',
        comision: '34310',
        profesor: 'Lautaro',
        fechaInicio: new Date(2022, 5, 1),
        fechaFin: new Date(2022, 6, 30),
        inscripcionAbierta: 'No',
      },
    ];
  }