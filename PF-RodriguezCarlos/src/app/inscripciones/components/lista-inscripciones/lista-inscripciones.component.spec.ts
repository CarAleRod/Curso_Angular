import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaInscripcionesComponent } from './lista-inscripciones.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { alumnosReducer } from 'src/app/alumnos/state/alumnos.reducer';
import { reducer } from 'src/app/core/state/sesion.reducer';
import { inscripcionesReducer } from '../../state/inscripciones.reducer';
import { cursosReducer } from 'src/app/cursos/state/cursos.reducer';

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

        StoreModule.forRoot({
          inscripciones: inscripcionesReducer,
          alumnos: alumnosReducer,
          cursos: cursosReducer,
          sesion: reducer,
        }),
      ],
      declarations: [ListaInscripcionesComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
