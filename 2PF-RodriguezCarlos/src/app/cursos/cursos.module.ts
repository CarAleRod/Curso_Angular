import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { MaterialModule } from '../material/material.module';
import { DatosCursoDialogComponent } from './components/datos-curso-dialog/datos-curso-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DetalleCursoDialogComponent } from './components/detalle-curso-dialog/detalle-curso-dialog.component';

@NgModule({
  declarations: [ListaCursosComponent, DatosCursoDialogComponent, DetalleCursoDialogComponent],
  imports: [CommonModule, SharedModule, MaterialModule, ReactiveFormsModule],
  exports: [],
  providers: [],
})
export class CursosModule {}
