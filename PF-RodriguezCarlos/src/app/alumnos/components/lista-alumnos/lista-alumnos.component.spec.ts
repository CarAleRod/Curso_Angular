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
import { StoreModule } from '@ngrx/store';
import { inscripcionesReducer } from 'src/app/inscripciones/state/inscripciones.reducer';
import { alumnosReducer } from '../../state/alumnos.reducer';
import { reducer } from 'src/app/core/state/sesion.reducer';
import { I_AlumnoState } from '../../models/alumno.state';

const alumnosEstadoInicial: I_AlumnoState = {
  cargando: false,
  alumnos: [],
};
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
        StoreModule.forRoot({
          inscripciones: inscripcionesReducer,
          alumnos: alumnosReducer,
          sesion: reducer,
        }),
      ],
      declarations: [ListaAlumnosComponent],
      providers: [
        { provide: MatDialog, useClass: DatosAlumnosDialogMock },
        provideMockStore({
          initialState: alumnosEstadoInicial,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Filtrar por un alumno', (done: DoneFn) => {
    let filtro = fixture.debugElement.query(By.css('#filtroAlumno'));
    filtro.triggerEventHandler('keyup', { target: { value: 'Willy' } });
    expect(component.dataSource.filteredData.length).toBe(0);
    done();
  });
});
