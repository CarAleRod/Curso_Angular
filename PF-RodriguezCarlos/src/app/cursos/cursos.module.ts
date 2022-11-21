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
import { InscripcionesService } from '../inscripciones/services/inscripciones.service';
import { CursosService } from './services/cursos.service';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from './state/cursos.effects';
import { StoreModule } from '@ngrx/store';
import { cursosFeatureKey, reducer } from './state/cursos.reducer';

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
    StoreModule.forFeature(cursosFeatureKey, reducer),
    EffectsModule.forFeature([CursosEffects]),
  ],
  exports: [],
  providers: [AlumnosService, InscripcionesService, CursosService],
})
export class CursosModule {}
