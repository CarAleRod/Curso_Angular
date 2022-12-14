import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { DatosUsuarioDialogComponent } from './components/datos-usuario-dialog/datos-usuario-dialog.component';
import { UsuariosService } from './service/usuarios.service';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from './state/usuarios.effects';
import { StoreModule } from '@ngrx/store';
import { usuariosFeatureKey, usuariosReducer } from './state/usuarios.reducer';

@NgModule({
  declarations: [ListaUsuariosComponent, DatosUsuarioDialogComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(usuariosFeatureKey, usuariosReducer),
    EffectsModule.forFeature([UsuariosEffects]),
  ],
  providers: [UsuariosService],
})
export class UsuariosModule {}
