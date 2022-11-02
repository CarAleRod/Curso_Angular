import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlumnoDialogComponent } from './detalle-alumno-dialog.component';

describe('DetalleAlumnoDialogComponent', () => {
  let component: DetalleAlumnoDialogComponent;
  let fixture: ComponentFixture<DetalleAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAlumnoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
