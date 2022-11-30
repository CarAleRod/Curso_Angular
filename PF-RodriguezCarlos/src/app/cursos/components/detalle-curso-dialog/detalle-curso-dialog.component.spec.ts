import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleCursoDialogComponent } from './detalle-curso-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { alumnosReducer } from 'src/app/alumnos/state/alumnos.reducer';
import { inscripcionesReducer } from 'src/app/inscripciones/state/inscripciones.reducer';
describe('DetalleCursoDialogComponent', () => {
  let component: DetalleCursoDialogComponent;
  let fixture: ComponentFixture<DetalleCursoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,

        StoreModule.forRoot({
          inscripciones: inscripcionesReducer,
          alumnos: alumnosReducer,
        }),
      ],
      declarations: [DetalleCursoDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: DetalleCursoDialogComponent },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            nombre: 'CSS',
            comision: '89987-4498',
            profesor: 'Justina',
            fechaInicio: '2022-10-04T21:10:18.498Z',
            fechaFin: '2023-09-11T22:47:45.953Z',
            inscripcionAbierta: true,
            id: '2',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleCursoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
