import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCursoPromiseComponent } from './lista-curso-promise.component';

describe('ListaCursoPromiseComponent', () => {
  let component: ListaCursoPromiseComponent;
  let fixture: ComponentFixture<ListaCursoPromiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCursoPromiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCursoPromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
