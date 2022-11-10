import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DetalleAlumnoDialogComponent } from './detalle-alumno-dialog.component';
import { ApellidoNombrePipe } from 'src/app/shared/pipes/apellido-nombre.pipe';
import { FemeninoMasculinoPipe } from 'src/app/shared/pipes/femenino-masculino.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, throwError } from 'rxjs';
import { I_Inscripcion } from 'src/app/inscripciones/models/inscripcion';
import { I_Curso } from 'src/app/cursos/models/curso';
import { CursosService } from 'src/app/cursos/services/cursos.service';
import { InscripcionesModule } from 'src/app/inscripciones/inscripciones.module';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Injectable({
  providedIn: 'root',
})
class InscripcionesServiceMock extends InscripcionesService {
  data: I_Inscripcion[] = [
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

  override obtenerInscripciones(): Observable<I_Inscripcion[]> {
    return of(this.data);
  }
  override borrarInscripcion(id: number): Observable<I_Inscripcion> {
    let ix = this.data.findIndex((curso) => curso.id == id);
    const removedData = this.data.splice(ix, 1);
    return of(removedData[0]);
  }
}

@Injectable({
  providedIn: 'root',
})
class CursosServiceMock extends CursosService {
  data: I_Curso[] = [
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
  override obtenerCurso(id: number): Observable<I_Curso> {
    let ix = this.data.findIndex((curso) => curso.id == id);
    return of(this.data[ix]);
  }
}

@Injectable({
  providedIn: 'root',
})
class ErrorInscripcionesServiceMock extends InscripcionesService {
  override obtenerInscripciones(): Observable<I_Inscripcion[]> {
    return throwError(() => new Error('Error provocado para test'));
  }
}

describe('DetalleAlumnoDialogComponent', () => {
  let component: DetalleAlumnoDialogComponent;
  let fixture: ComponentFixture<DetalleAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        InscripcionesModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        DetalleAlumnoDialogComponent,
        ApellidoNombrePipe,
        FemeninoMasculinoPipe,
      ],
      providers: [
        { provide: InscripcionesService, useClass: InscripcionesServiceMock },
        { provide: CursosService, useClass: CursosServiceMock },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Actualizar lista de inscripciones del alumno', (done: DoneFn) => {
    component.actualizarLista();
    expect(component.dataSource.data.length).toBe(1);
    done();
  });

  it('Borrar una inscripción del alumno', (done: DoneFn) => {
    component.borrar(2);
    expect(component.dataSource.data.length).toBe(0);
    done();
  });

  it('Filtrar por una inscripción del alumno a un curso inexistente', (done: DoneFn) => {
    let filtro = fixture.debugElement.query(By.css('#filtroCurso'));
    filtro.triggerEventHandler('keyup', { target: { value: 'JAVA' } });
    expect(component.dataSource.filteredData.length).toBe(0);
    done();
  });
});

describe('DetalleAlumnoDialogComponent (Error)', () => {
  let component: DetalleAlumnoDialogComponent;
  let fixture: ComponentFixture<DetalleAlumnoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        InscripcionesModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        DetalleAlumnoDialogComponent,
        ApellidoNombrePipe,
        FemeninoMasculinoPipe,
      ],
      providers: [
        {
          provide: InscripcionesService,
          useClass: ErrorInscripcionesServiceMock,
        },
        { provide: CursosService, useClass: CursosServiceMock },
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
  });

  it('Captura el error desde el servicio de inscripciones', (done: DoneFn) => {
    component.actualizarLista();
    expect(component.dataSource.data.length).toBe(0);
    done();
  });
});
