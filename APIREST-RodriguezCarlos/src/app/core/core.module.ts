import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../material/material.module';
import { SesionService } from './services/sesion.service';

@NgModule({
  declarations: [PageNotFoundComponent, HomeComponent],
  imports: [CommonModule, MaterialModule],
  providers: [SesionService],
  exports: [],
})
export class CoreModule {}
