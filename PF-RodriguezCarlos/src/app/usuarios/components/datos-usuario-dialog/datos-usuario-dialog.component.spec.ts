import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

import { DatosUsuarioDialogComponent } from './datos-usuario-dialog.component';

describe('DatosUsuarioDialogComponent', () => {
  let component: DatosUsuarioDialogComponent;
  let fixture: ComponentFixture<DatosUsuarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      declarations: [DatosUsuarioDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: DatosUsuarioDialogComponent },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
