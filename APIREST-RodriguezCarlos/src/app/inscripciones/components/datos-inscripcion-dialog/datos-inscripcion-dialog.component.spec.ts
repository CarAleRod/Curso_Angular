import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosInscripcionDialogComponent } from './datos-inscripcion-dialog.component';

describe('DatosInscripcionDialogComponent', () => {
  let component: DatosInscripcionDialogComponent;
  let fixture: ComponentFixture<DatosInscripcionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosInscripcionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosInscripcionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
