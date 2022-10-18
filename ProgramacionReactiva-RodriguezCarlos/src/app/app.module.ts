import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { Header20Directive } from './directives/header20.directive';
import { MaterialModule } from './material/material.module';
import { DatosCursoDialogComponent } from './components/lista-cursos/datos-curso-dialog/datos-curso-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaCursos2Component } from './components/lista-cursos2/lista-cursos2.component';
import { ListaCursoPromiseComponent } from './components/lista-curso-promise/lista-curso-promise.component';
import { ListaCursosPipeasyncComponent } from './components/lista-cursos-pipeasync/lista-cursos-pipeasync.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaCursosComponent,
    NavbarComponent,
    ToolbarComponent,
    Header20Directive,
    DatosCursoDialogComponent,
    ListaCursos2Component,
    ListaCursoPromiseComponent,
    ListaCursosPipeasyncComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
