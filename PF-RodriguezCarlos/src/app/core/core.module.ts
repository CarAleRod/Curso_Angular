import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../material/material.module';
import { reducer, sesionFeatureKey } from './state/sesion.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [PageNotFoundComponent, HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(sesionFeatureKey, reducer),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
