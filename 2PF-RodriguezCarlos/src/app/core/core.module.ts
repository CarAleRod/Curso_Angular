import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { CursosModule } from '../cursos/cursos.module';
import { AlumnosModule } from '../alumnos/alumnos.module';
import { InscripcionesModule } from '../inscripciones/inscripciones.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HomeComponent,
    ToolbarComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CursosModule,
    AlumnosModule,
    InscripcionesModule,
  ],
  exports: [MaterialModule, NavbarComponent, ToolbarComponent],
})
export class CoreModule {}
