import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosAlumnoDialogComponent } from './components/lista-alumnos/datos-alumno-dialog/datos-alumno-dialog.component';
import { ApellidoNombrePipe } from './pipes/apellido-nombre.pipe';
import { Header20Directive } from './directives/header20.directive';
import { FemeninoMasculinoPipe } from './pipes/femenino-masculino.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListaAlumnosComponent,
    NavbarComponent,
    ToolbarComponent,
    DatosAlumnoDialogComponent,
    ApellidoNombrePipe,
    Header20Directive,
    FemeninoMasculinoPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
