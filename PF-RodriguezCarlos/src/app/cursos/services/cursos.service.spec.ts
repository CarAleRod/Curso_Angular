import { TestBed } from '@angular/core/testing';
import { CursosService } from './cursos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CursosService', () => {
  let service: CursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
