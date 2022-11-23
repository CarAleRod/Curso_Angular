import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosService } from '../usuarios/service/usuarios.service';
import { StoreModule } from '@ngrx/store';
import {
  usuariosFeatureKey,
  usuariosReducer,
} from '../usuarios/state/usuarios.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosEffects } from '../usuarios/state/usuarios.effects';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature(usuariosFeatureKey, usuariosReducer),
    EffectsModule.forFeature([UsuariosEffects]),
  ],
  providers: [UsuariosService],
})
export class AutenticacionModule {}
