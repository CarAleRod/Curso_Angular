import { TestBed } from '@angular/core/testing';

import { InscripcionesService } from './inscripciones.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InscripcionesService', () => {
  let service: InscripcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(InscripcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
