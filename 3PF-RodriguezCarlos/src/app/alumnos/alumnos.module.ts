import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { DatosAlumnoDialogComponent } from './components/datos-alumno-dialog/datos-alumno-dialog.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleAlumnoDialogComponent } from './components/detalle-alumno-dialog/detalle-alumno-dialog.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { AlumnosService } from './services/alumnos.service';
import { InscripcionesService } from '../inscripciones/services/inscripciones.service';
import { CursosService } from '../cursos/services/cursos.service';

@NgModule({
  declarations: [
    ListaAlumnosComponent,
    DatosAlumnoDialogComponent,
    DetalleAlumnoDialogComponent,
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [AlumnosService, InscripcionesService, CursosService],
  exports: [],
})
export class AlumnosModule {}
