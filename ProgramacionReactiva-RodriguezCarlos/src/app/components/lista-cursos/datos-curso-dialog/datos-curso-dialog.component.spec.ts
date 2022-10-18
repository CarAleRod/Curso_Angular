import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCursoDialogComponent } from './datos-curso-dialog.component';

describe('DatosCursoDialogComponent', () => {
  let component: DatosCursoDialogComponent;
  let fixture: ComponentFixture<DatosCursoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosCursoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosCursoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
