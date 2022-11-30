import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AlumnosService } from '../services/alumnos.service';

import { AlumnosEffects } from './alumnos.effects';

describe('AlumnosEffects', () => {
  let actions$: Observable<any>;
  let effects: AlumnosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AlumnosEffects,
        provideMockActions(() => actions$),
        AlumnosService,
      ],
    });

    effects = TestBed.inject(AlumnosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
