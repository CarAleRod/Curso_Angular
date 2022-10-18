import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({imports: [
  MatTableModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatToolbarModule,
  MatMenuModule,
  MatNativeDateModule,
  MatDatepickerModule
],
exports: [
  MatTableModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatSelectModule,
  MatToolbarModule,
  MatMenuModule,
  MatNativeDateModule,
  MatDatepickerModule
],
providers: [],
})
export class MaterialModule { }
