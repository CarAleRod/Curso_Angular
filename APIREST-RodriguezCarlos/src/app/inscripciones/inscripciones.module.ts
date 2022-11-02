import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaInscripcionesComponent } from './components/lista-inscripciones/lista-inscripciones.component';
import { DatosInscripcionDialogComponent } from './components/datos-inscripcion-dialog/datos-inscripcion-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { CursosService } from '../cursos/services/cursos.service';
import { InscripcionesService } from './services/inscripciones.service';

@NgModule({
  declarations: [ListaInscripcionesComponent, DatosInscripcionDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    InscripcionesRoutingModule,
  ],
  exports: [],
  providers: [AlumnosService, InscripcionesService, CursosService],
})
export class InscripcionesModule {}
