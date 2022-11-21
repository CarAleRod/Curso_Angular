import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { I_Curso } from '../models/curso';
import { CursosService } from '../services/cursos.service';

import { CursosEffects } from './cursos.effects';

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
describe('CursosEffects', () => {
  let actions$: Observable<any>;
  let effects: CursosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CursosEffects,
        provideMockActions(() => actions$),

        { provide: CursosService, useClass: CursosServiceMock },
      ],
    });

    effects = TestBed.inject(CursosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
