import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosInscripcionDialogComponent } from './datos-inscripcion-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

describe('DatosInscripcionDialogComponent', () => {
  let component: DatosInscripcionDialogComponent;
  let fixture: ComponentFixture<DatosInscripcionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [DatosInscripcionDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: DatosInscripcionDialogComponent },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            cursoId: '2',
            alumnoId: '2',
            id: '1',
            cursoNombre: 'CSS',
            alumnoNombre: 'Josefilo',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosInscripcionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
