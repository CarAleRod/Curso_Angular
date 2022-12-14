import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header20Directive } from './directives/header20.directive';
import { FemeninoMasculinoPipe } from './pipes/femenino-masculino.pipe';
import { ApellidoNombrePipe } from './pipes/apellido-nombre.pipe';

@NgModule({
  declarations: [Header20Directive, FemeninoMasculinoPipe, ApellidoNombrePipe],
  imports: [CommonModule],
  exports: [Header20Directive, FemeninoMasculinoPipe, ApellidoNombrePipe],
})
export class SharedModule {}
