import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DetalleAlumnoDialogComponent } from './detalle-alumno-dialog.component';
import { ApellidoNombrePipe } from 'src/app/shared/pipes/apellido-nombre.pipe';
import { FemeninoMasculinoPipe } from 'src/app/shared/pipes/femenino-masculino.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { I_Inscripcion } from 'src/app/inscripciones/models/inscripcion';
import { I_Curso } from 'src/app/cursos/models/curso';
import { InscripcionesModule } from 'src/app/inscripciones/inscripciones.module';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { I_InscripcionState } from 'src/app/inscripciones/models/inscripcion.state';
import { I_CursoState } from 'src/app/cursos/models/curso.state';
import { cursosReducer } from 'src/app/cursos/state/cursos.reducer';
import { inscripcionesReducer } from 'src/app/inscripciones/state/inscripciones.reducer';
import { EffectsModule } from '@ngrx/effects';
import { selectInscripciones } from 'src/app/inscripciones/state/inscripciones.selectors';
import { selectCursos } from 'src/app/cursos/state/cursos.selectors';

const inscripcionesEstadoInicial: I_InscripcionState = {
  cargando: false,
  inscripciones: [],
};
const inscripcionesEstado2: I_Inscripcion[] = [
  {
    cursoId: 1,
    alumnoId: 1,
    id: 1,
  },
  {
    cursoId: 2,
    alumnoId: 8,
    id: 2,
  },
];

const cursosEstadoInicial: I_CursoState = {
  cargando: false,
  cursos: [],
};
const cursosEstado2: I_Curso[] = [
  {
    nombre: 'SMS',
    comision: '47990-9591',
    profesor: 'Waylon',
    fechaInicio: new Date('2022-01-02T03:26:22.260Z'),
    fechaFin: new Date('2023-04-19T03:04:28.243Z'),
    inscripcionAbierta: false,
    id: 1,
  },
  {
    nombre: 'SQL',
    comision: '44813-6260',
    profesor: 'Keshaun',
    fechaInicio: new Date('2022-06-21T03:42:11.092Z'),
    fechaFin: new Date('2022-11-01T14:11:13.848Z'),
    inscripcionAbierta: true,
    id: 2,
  },
];

describe('DetalleAlumnoDialogComponent', () => {
  let component: DetalleAlumnoDialogComponent;
  let fixture: ComponentFixture<DetalleAlumnoDialogComponent>;

  let storeInscripciones: MockStore<I_InscripcionState>;
  let storeCursos: MockStore<I_CursoState>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        InscripcionesModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          inscripciones: inscripcionesReducer,
          cursos: cursosReducer,
        }),
        EffectsModule.forRoot(),
      ],
      declarations: [
        DetalleAlumnoDialogComponent,
        ApellidoNombrePipe,
        FemeninoMasculinoPipe,
      ],
      providers: [
        provideMockStore({
          initialState: inscripcionesEstadoInicial,
        }),
        provideMockStore({ initialState: cursosEstadoInicial }),
        { provide: MatDialogRef, useValue: DetalleAlumnoDialogComponent },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            nombre: 'Willy',
            apellido: 'Botsford',
            edad: 52,
            genero: 'M',
            fechaDeIngreso: new Date('2022-10-30T22:46:07.783Z'),
            id: 8,
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DetalleAlumnoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storeInscripciones = TestBed.inject(MockStore<I_InscripcionState>);
    storeCursos = TestBed.inject(MockStore<I_CursoState>);
    storeInscripciones.overrideSelector(
      selectInscripciones,
      inscripcionesEstado2 as I_Inscripcion[]
    );
    storeCursos.overrideSelector(selectCursos, cursosEstado2 as I_Curso[]);

    storeCursos.refreshState();
    storeInscripciones.refreshState();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
