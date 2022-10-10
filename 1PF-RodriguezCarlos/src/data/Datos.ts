import { I_Alumno } from 'src/models/alumno';

export class BaseDeDatos {
  static Alumnos: I_Alumno[] = [
    {
      id: 1,
      nombre: 'Leandro',
      apellido: 'RdR',
      edad: 29,
      genero: 'M',
      fechaDeIngreso: new Date(2021, 11, 28),
    },
    {
      id: 2,
      nombre: 'Gonzalo',
      apellido: 'RdR',
      edad: 26,
      genero: 'M',
      fechaDeIngreso: new Date(2022, 4, 14),
    },
    {
      id: 3,
      nombre: 'Gabriel',
      apellido: 'RdR',
      edad: 24,
      genero: 'M',
      fechaDeIngreso: new Date(2022, 6, 20),
    },
    {
      id: 4,
      nombre: 'Luciano',
      apellido: 'RdR',
      edad: 19,
      genero: 'M',
      fechaDeIngreso: new Date(2022, 5, 6),
    },
    {
      id: 5,
      nombre: 'Marisa',
      apellido: 'dR',
      edad: 44,
      genero: 'F',
      fechaDeIngreso: new Date(2020, 10, 31),
    },
  ];
}
