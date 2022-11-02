import { I_Alumno } from 'src/app/alumnos/models/alumno';
import { I_Curso } from 'src/app/cursos/models/curso';
import { I_Inscripcion } from 'src/app/inscripciones/models/inscripcion';

export class BaseDeDatos {
  // static Cursos: I_Curso[] = [
  //   {
  //     id: 1,
  //     nombre: 'Angular',
  //     comision: '32310',
  //     profesor: 'Keven',
  //     fechaInicio: new Date(2022, 0, 1),
  //     fechaFin: new Date(2022, 1, 28),
  //     inscripcionAbierta: 'Si',
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Javascript',
  //     comision: '32320',
  //     profesor: 'Fernando',
  //     fechaInicio: new Date(2022, 2, 1),
  //     fechaFin: new Date(2022, 3, 30),
  //     inscripcionAbierta: 'Si',
  //   },
  //   {
  //     id: 3,
  //     nombre: 'ReactJS',
  //     comision: '33310',
  //     profesor: 'Arturo',
  //     fechaInicio: new Date(2022, 1, 1),
  //     fechaFin: new Date(2022, 3, 28),
  //     inscripcionAbierta: 'No',
  //   },
  //   {
  //     id: 4,
  //     nombre: 'VueJS',
  //     comision: '34310',
  //     profesor: 'Lautaro',
  //     fechaInicio: new Date(2022, 5, 1),
  //     fechaFin: new Date(2022, 6, 30),
  //     inscripcionAbierta: 'No',
  //   },
  // ];

  // static Alumnos: I_Alumno[] = [
  //   {
  //     id: 1,
  //     nombre: 'Leandro',
  //     apellido: 'Rodriguez',
  //     edad: 29,
  //     genero: 'M',
  //     fechaDeIngreso: new Date(2021, 11, 28),
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Gonzalo',
  //     apellido: 'Suarez',
  //     edad: 26,
  //     genero: 'M',
  //     fechaDeIngreso: new Date(2022, 4, 14),
  //   },
  //   {
  //     id: 3,
  //     nombre: 'Gabriel',
  //     apellido: 'Gonzalez',
  //     edad: 24,
  //     genero: 'M',
  //     fechaDeIngreso: new Date(2022, 6, 20),
  //   },
  //   {
  //     id: 4,
  //     nombre: 'Luciano',
  //     apellido: 'Martinez',
  //     edad: 19,
  //     genero: 'M',
  //     fechaDeIngreso: new Date(2022, 5, 6),
  //   },
  //   {
  //     id: 5,
  //     nombre: 'Marisa',
  //     apellido: 'Del Rio',
  //     edad: 44,
  //     genero: 'F',
  //     fechaDeIngreso: new Date(2020, 10, 31),
  //   },
  // ];
  static Inscripciones: I_Inscripcion[] = [
    {
      id: 1,
      cursoId: 1,
      alumnoId: 1,
    },
    {
      id: 2,
      cursoId: 1,
      alumnoId: 2,
    },
    {
      id: 3,
      cursoId: 2,
      alumnoId: 3,
    },
    {
      id: 4,
      cursoId: 2,
      alumnoId: 4,
    },
    {
      id: 5,
      cursoId: 3,
      alumnoId: 5,
    },
    {
      id: 6,
      cursoId: 3,
      alumnoId: 1,
    },
    {
      id: 7,
      cursoId: 3,
      alumnoId: 2,
    },
    {
      id: 8,
      cursoId: 4,
      alumnoId: 3,
    },
    {
      id: 9,
      cursoId: 4,
      alumnoId: 4,
    },
    {
      id: 10,
      cursoId: 4,
      alumnoId: 5,
    },
    {
      id: 11,
      cursoId: 3,
      alumnoId: 3,
    },
  ];
}
