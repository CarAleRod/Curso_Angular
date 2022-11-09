import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaInscripcionesComponent } from './lista-inscripciones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';

describe('ListaInscripcionesComponent', () => {
  let component: ListaInscripcionesComponent;
  let fixture: ComponentFixture<ListaInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [ListaInscripcionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
