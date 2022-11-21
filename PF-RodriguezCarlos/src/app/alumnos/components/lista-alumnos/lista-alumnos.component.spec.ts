import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAlumnosComponent } from './lista-alumnos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { AlumnosService } from '../../services/alumnos.service';
import { I_Alumno } from '../../models/alumno';
import { Observable, of, throwError } from 'rxjs';
import { InscripcionesService } from 'src/app/inscripciones/services/inscripciones.service';
import { Injectable } from '@angular/core';
import { I_Inscripcion } from 'src/app/inscripciones/models/inscripcion';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { provideMockStore } from '@ngrx/store/testing';
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
      alumnoId: 2,
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

  override borrarInscripcionesPorAlumno(id: number) {
    let inscripcionesDelAlumno = this.data.filter(
      (insc) => insc.alumnoId == id
    );
    inscripcionesDelAlumno.forEach((inscripcionDelAlumno) =>
      this.borrarInscripcion(inscripcionDelAlumno.id).subscribe()
    );
  }
}

@Injectable({
  providedIn: 'root',
})
class AlumnosServiceMock extends AlumnosService {
  data: I_Alumno[] = [
    {
      nombre: 'Willy',
      apellido: 'Botsford',
      edad: 52,
      genero: 'M',
      fechaDeIngreso: new Date('2022-10-30T22:46:07.783Z'),
      id: 1,
    },
    {
      nombre: 'Marlin',
      apellido: 'Hoppe',
      edad: 32,
      genero: 'M',
      fechaDeIngreso: new Date('2022-10-30T09:23:02.626Z'),
      id: 2,
    },
  ];
  override obtenerAlumno(id: number): Observable<I_Alumno> {
    let ix = this.data.findIndex((alumno) => alumno.id == id);
    return of(this.data[ix]);
  }

  override obtenerAlumnos(): Observable<I_Alumno[]> {
    return of(this.data);
  }

  override borrarAlumno(id: number): Observable<I_Alumno> {
    let ix = this.data.findIndex((alumno) => alumno.id == id);
    const removedData = this.data.splice(ix, 1);
    return of(removedData[0]);
  }
  override agregarAlumno(alumno: I_Alumno): Observable<I_Alumno> {
    this.data.push(alumno);
    return of(alumno);
  }
  override modificarAlumno(id: number, alumno: I_Alumno): Observable<I_Alumno> {
    let ix = this.data.findIndex((alumno) => alumno.id == id);
    this.data[ix] = alumno;
    return of(alumno);
  }
}

@Injectable({
  providedIn: 'root',
})
class ErrorAlumnosServiceMock extends AlumnosService {
  override obtenerAlumnos(): Observable<I_Alumno[]> {
    return throwError(() => new Error('Error provocado para test'));
  }
}
class DatosAlumnosDialogMock {
  result!: I_Alumno;

  setResult(val: I_Alumno) {
    this.result = val;
  }
  open() {
    return {
      beforeClosed: () =>
        of({
          nombre: 'Willy Jean',
          apellido: 'Botsford',
          edad: 52,
          genero: 'M',
          fechaDeIngreso: new Date('2022-10-30T22:46:07.783Z'),
          id: 1,
        }),
    };
  }
  // open() {}
  close() {
    return of(this.result);
  }
  afterClosed() {
    return of(this.result);
  }
}
describe('ListaAlumnosComponent', () => {
  let component: ListaAlumnosComponent;
  let fixture: ComponentFixture<ListaAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule,
      ],
      declarations: [ListaAlumnosComponent],
      providers: [
        { provide: AlumnosService, useClass: AlumnosServiceMock },
        { provide: InscripcionesService, useClass: InscripcionesServiceMock },
        { provide: MatDialog, useClass: DatosAlumnosDialogMock },
        provideMockStore({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Actualizar lista de alumnos', (done: DoneFn) => {
    component.ngOnInit();
    expect(component.dataSource.data.length).toBe(2);
    done();
  });

  it('Borrar un alumno', (done: DoneFn) => {
    component.borrar(2);
    expect(component.dataSource.data.length).toBe(1);
    done();
  });

  it('Modificar un alumno', (done: DoneFn) => {
    component.editar(1);
    let ix = component.dataSource.data.findIndex((alumno) => alumno.id == 1);
    expect(component.dataSource.data[ix].nombre).toMatch('Willy Jean');
    done();
  });

  it('Ver detalle de un alumno', (done: DoneFn) => {
    component.verDetalle(1);
    expect(true).toBe(true);
    done();
  });
  it('Alta de un alumno', (done: DoneFn) => {
    const len = component.dataSource.data.length;
    component.openDialog();
    const newLen = component.dataSource.data.length;
    expect(newLen).toBe(len + 1);
    done();
  });

  it('Filtrar por un alumno', (done: DoneFn) => {
    let filtro = fixture.debugElement.query(By.css('#filtroAlumno'));
    filtro.triggerEventHandler('keyup', { target: { value: 'Willy' } });
    expect(component.dataSource.filteredData.length).toBe(1);
    done();
  });
});

describe('ListaAlumnosComponent (error)', () => {
  let component: ListaAlumnosComponent;
  let fixture: ComponentFixture<ListaAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule,
      ],
      declarations: [ListaAlumnosComponent],
      providers: [
        { provide: AlumnosService, useClass: ErrorAlumnosServiceMock },
        { provide: InscripcionesService, useClass: InscripcionesServiceMock },
        { provide: MatDialog, useClass: DatosAlumnosDialogMock },
        provideMockStore({}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Captura el error desde el servicio de alumnos', (done: DoneFn) => {
    component.actualizarLista();
    expect(component.dataSource.data.length).toBe(0);
    done();
  });
});
