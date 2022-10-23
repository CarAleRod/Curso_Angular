import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { DatosAlumnoDialogComponent } from './components/datos-alumno-dialog/datos-alumno-dialog.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleAlumnoDialogComponent } from './components/detalle-alumno-dialog/detalle-alumno-dialog.component';

@NgModule({
  declarations: [ListaAlumnosComponent, DatosAlumnoDialogComponent, DetalleAlumnoDialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, SharedModule],
  exports: [],
})
export class AlumnosModule {}
