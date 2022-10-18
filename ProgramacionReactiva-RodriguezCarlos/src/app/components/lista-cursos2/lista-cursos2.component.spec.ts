import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCursos2Component } from './lista-cursos2.component';

describe('ListaCursos2Component', () => {
  let component: ListaCursos2Component;
  let fixture: ComponentFixture<ListaCursos2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCursos2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCursos2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
