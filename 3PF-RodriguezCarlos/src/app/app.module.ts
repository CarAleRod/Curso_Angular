import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ToolbarComponent } from './core/components/toolbar/toolbar.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent, ToolbarComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
