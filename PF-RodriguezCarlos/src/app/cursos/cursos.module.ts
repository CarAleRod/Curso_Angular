import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { MaterialModule } from '../material/material.module';
import { DatosCursoDialogComponent } from './components/datos-curso-dialog/datos-curso-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DetalleCursoDialogComponent } from './components/detalle-curso-dialog/detalle-curso-dialog.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { AlumnosService } from '../alumnos/services/alumnos.service';
import { CursosService } from './services/cursos.service';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './state/cursos.effects';
import { StoreModule } from '@ngrx/store';
import { cursosFeatureKey, cursosReducer } from './state/cursos.reducer';
import {
  inscripcionesFeatureKey,
  inscripcionesReducer,
} from '../inscripciones/state/inscripciones.reducer';
import { InscripcionesEffects } from '../inscripciones/state/inscripciones.effects';
import { InscripcionesService } from '../inscripciones/services/inscripciones.service';

@NgModule({
  declarations: [
    ListaCursosComponent,
    DatosCursoDialogComponent,
    DetalleCursoDialogComponent,
  ],
  imports: [
    CursosRoutingModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(cursosFeatureKey, cursosReducer),
    EffectsModule.forFeature([CursosEffects]),
    StoreModule.forFeature(inscripcionesFeatureKey, inscripcionesReducer),
    EffectsModule.forFeature([InscripcionesEffects]),
  ],
  exports: [],
  providers: [AlumnosService, CursosService, InscripcionesService],
})
export class CursosModule {}
