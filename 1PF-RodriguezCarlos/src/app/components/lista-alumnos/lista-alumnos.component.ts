import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BaseDeDatos } from 'src/data/Datos';
import { I_Alumno } from 'src/models/alumno';
import { MatDialog } from '@angular/material/dialog';
import { DatosAlumnoDialogComponent } from './datos-alumno-dialog/datos-alumno-dialog.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent implements OnInit {
  alumnos: I_Alumno[] = BaseDeDatos.Alumnos;
  columnas: string[] = [
    'nombre',
    'edad',
    'genero',
    'fechaDeIngreso',
    'acciones',
  ];
  dataSource: MatTableDataSource<I_Alumno> = new MatTableDataSource<I_Alumno>(
    this.alumnos
  );

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  editar(id: number) {
    let position = this.alumnos.findIndex((alumno) => alumno.id == id);
    let alumnoData = this.alumnos[position];
    let dialog = this.dialog.open(DatosAlumnoDialogComponent, {
      width: '50%',
      height: '65%',
      data: alumnoData,
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        this.alumnos[position] = res;
        this.dataSource.data = this.alumnos;
      }
    });
  }

  borrar(id: number) {
    let position = this.alumnos.findIndex((alumno) => alumno.id == id);
    this.alumnos.splice(position, 1);
    this.dataSource.data = this.alumnos;
  }
  openDialog() {
    let dialog = this.dialog.open(DatosAlumnoDialogComponent, {
      width: '50%',
      height: '65%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        let newId: number = this.obtenerProximoId();
        let newAlumnData = {
          ...res,
          id: newId,
        };
        newAlumnData.fechaDeIngreso = new Date();
        this.alumnos.push(newAlumnData);
        this.dataSource.data = this.alumnos;
      }
    });
  }

  filtrar(event: Event) {
    const valorFiltro = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = function (
      alumno: I_Alumno,
      filtro: string
    ) {
      return (
        alumno.nombre
          .toLocaleLowerCase()
          .includes(filtro.toLocaleLowerCase()) ||
        alumno.apellido.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
      );
    };
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
  }

  obtenerProximoId() {
    let maxId: number = 0;
    this.alumnos.forEach((alumno) => {
      if (alumno.id > maxId) {
        maxId = alumno.id;
      }
    });
    return maxId + 1;
  }
}
