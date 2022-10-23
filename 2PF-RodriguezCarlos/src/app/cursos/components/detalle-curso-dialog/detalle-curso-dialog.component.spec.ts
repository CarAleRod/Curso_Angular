import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCursoDialogComponent } from './detalle-curso-dialog.component';

describe('DetalleCursoDialogComponent', () => {
  let component: DetalleCursoDialogComponent;
  let fixture: ComponentFixture<DetalleCursoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCursoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCursoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
