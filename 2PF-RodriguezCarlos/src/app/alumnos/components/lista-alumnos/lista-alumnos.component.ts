import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
import { I_Alumno } from '../../models/alumno';
import { AlumnosService } from '../../services/alumnos.service';
import { DatosAlumnoDialogComponent } from '../datos-alumno-dialog/datos-alumno-dialog.component';
import { DetalleAlumnoDialogComponent } from '../detalle-alumno-dialog/detalle-alumno-dialog.component';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css'],
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {
  subscripcion!: Subscription;
  columnas: string[] = [
    'nombre',
    'edad',
    'genero',
    'fechaDeIngreso',
    'acciones',
  ];
  dataSource: MatTableDataSource<I_Alumno> = new MatTableDataSource<I_Alumno>();

  constructor(
    private alumnosService: AlumnosService,
    private inscripcionService: InscripcionesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.subscripcion = this.alumnosService.alumnosObservables.subscribe({
      next: (alumnos: I_Alumno[]) => {
        this.dataSource.data = alumnos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  editar(id: number) {
    let position = this.dataSource.data.findIndex((alumno) => alumno.id == id);
    let alumnoData = this.dataSource.data[position];

    let dialog = this.dialog.open(DatosAlumnoDialogComponent, {
      width: '50%',
      height: '80%',
      data: alumnoData,
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        this.alumnosService.modificarAlumno(id, res);
      }
    });
  }
  verDetalle(id: number) {
    {
      let position = this.dataSource.data.findIndex(
        (alumno) => alumno.id == id
      );
      let alumnoData = this.dataSource.data[position];

      let dialog = this.dialog.open(DetalleAlumnoDialogComponent, {
        width: '80%',
        height: '80%',
        data: alumnoData,
      });
    }
  }

  borrar(id: number) {
    this.alumnosService.borrarAlumno(id);
    this.inscripcionService.borrarInscripcionesPorAlumno(id);
  }
  openDialog() {
    let dialog = this.dialog.open(DatosAlumnoDialogComponent, {
      width: '50%',
      height: '80%',
    });

    dialog.beforeClosed().subscribe((res) => {
      if (res) {
        let newId: number = this.obtenerProximoId();
        let newData = {
          ...res,
          id: newId,
        };
        newData.fechaDeIngreso = new Date();
        this.alumnosService.agregarAlumno(newData);
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
    this.dataSource.data.forEach((alumno) => {
      if (alumno.id > maxId) {
        maxId = alumno.id;
      }
    });
    return maxId + 1;
  }
}
