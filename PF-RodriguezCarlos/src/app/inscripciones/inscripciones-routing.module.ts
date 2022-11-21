import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaInscripcionesComponent } from './components/lista-inscripciones/lista-inscripciones.component';

const routes: Routes = [{ path: '', component: ListaInscripcionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionesRoutingModule {}
