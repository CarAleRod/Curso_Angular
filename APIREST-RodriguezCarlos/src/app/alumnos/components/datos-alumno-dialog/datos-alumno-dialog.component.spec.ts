import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAlumnoDialogComponent } from './datos-alumno-dialog.component';

describe('DatosAlumnoDialogComponent', () => {
  let component: DatosAlumnoDialogComponent;
  let fixture: ComponentFixture<DatosAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosAlumnoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
