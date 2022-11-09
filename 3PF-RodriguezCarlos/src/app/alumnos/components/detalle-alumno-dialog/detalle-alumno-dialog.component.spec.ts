import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DetalleAlumnoDialogComponent } from './detalle-alumno-dialog.component';
import { ApellidoNombrePipe } from 'src/app/shared/pipes/apellido-nombre.pipe';
import { FemeninoMasculinoPipe } from 'src/app/shared/pipes/femenino-masculino.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DetalleAlumnoDialogComponent', () => {
  let component: DetalleAlumnoDialogComponent;
  let fixture: ComponentFixture<DetalleAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        DetalleAlumnoDialogComponent,
        ApellidoNombrePipe,
        FemeninoMasculinoPipe,
      ],
      providers: [
        { provide: MatDialogRef, useValue: DetalleAlumnoDialogComponent },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            nombre: 'Willy',
            apellido: 'Botsford',
            edad: 52,
            genero: 'M',
            fechaDeIngreso: '2022-10-30T22:46:07.783Z',
            id: '1',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
