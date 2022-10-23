import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaInscripcionesComponent } from './components/lista-inscripciones/lista-inscripciones.component';
import { DatosInscripcionDialogComponent } from './components/datos-inscripcion-dialog/datos-inscripcion-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListaInscripcionesComponent, DatosInscripcionDialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, SharedModule],
  exports: [],
})
export class InscripcionesModule {}
