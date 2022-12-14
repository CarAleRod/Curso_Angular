import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { InscripcionesService } from '../services/inscripciones.service';

import { InscripcionesEffects } from './inscripciones.effects';

describe('InscripcionesEffects', () => {
  let actions$: Observable<any>;
  let effects: InscripcionesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InscripcionesEffects,
        provideMockActions(() => actions$),
        InscripcionesService,
      ],
    });

    effects = TestBed.inject(InscripcionesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
