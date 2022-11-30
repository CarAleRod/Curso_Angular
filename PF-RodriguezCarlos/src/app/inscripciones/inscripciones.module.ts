import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaInscripcionesComponent } from './components/lista-inscripciones/lista-inscripciones.component';
import { DatosInscripcionDialogComponent } from './components/datos-inscripcion-dialog/datos-inscripcion-dialog.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { InscripcionesService } from './services/inscripciones.service';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './state/inscripciones.effects';
import {
  inscripcionesFeatureKey,
  inscripcionesReducer,
} from './state/inscripciones.reducer';
import { StoreModule } from '@ngrx/store';
import {
  cursosFeatureKey,
  cursosReducer,
} from '../cursos/state/cursos.reducer';
import { CursosEffects } from '../cursos/state/cursos.effects';
import { CursosService } from '../cursos/services/cursos.service';
import {
  alumnosFeatureKey,
  alumnosReducer,
} from '../alumnos/state/alumnos.reducer';
import { AlumnosEffects } from '../alumnos/state/alumnos.effects';

@NgModule({
  declarations: [ListaInscripcionesComponent, DatosInscripcionDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    InscripcionesRoutingModule,
    StoreModule.forFeature(inscripcionesFeatureKey, inscripcionesReducer),
    StoreModule.forFeature(cursosFeatureKey, cursosReducer),
    EffectsModule.forFeature([InscripcionesEffects]),
    EffectsModule.forFeature([CursosEffects]),
    StoreModule.forFeature(alumnosFeatureKey, alumnosReducer),
    EffectsModule.forFeature([AlumnosEffects]),
  ],
  exports: [],
  providers: [AlumnosService, InscripcionesService, CursosService],
})
export class InscripcionesModule {}
