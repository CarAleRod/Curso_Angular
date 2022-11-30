import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { UsuariosService } from '../service/usuarios.service';

import { UsuariosEffects } from './usuarios.effects';

describe('UsuariosEffects', () => {
  let actions$: Observable<any>;
  let effects: UsuariosEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsuariosEffects,
        provideMockActions(() => actions$),
        UsuariosService,
      ],
    });

    effects = TestBed.inject(UsuariosEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
