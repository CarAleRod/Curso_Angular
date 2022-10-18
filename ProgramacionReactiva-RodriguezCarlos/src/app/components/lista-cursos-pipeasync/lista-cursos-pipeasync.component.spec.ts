import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCursosPipeasyncComponent } from './lista-cursos-pipeasync.component';

describe('ListaCursosPipeasyncComponent', () => {
  let component: ListaCursosPipeasyncComponent;
  let fixture: ComponentFixture<ListaCursosPipeasyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCursosPipeasyncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCursosPipeasyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
