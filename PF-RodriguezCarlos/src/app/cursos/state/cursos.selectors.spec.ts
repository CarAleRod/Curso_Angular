import { I_Curso } from '../models/curso';
import { I_CursoState } from '../models/curso.state';
import * as fromCursos from './cursos.reducer';
import { selectCursosState } from './cursos.selectors';

describe('Cursos Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCursosState({
      [fromCursos.cursosFeatureKey]: {},
    });
    expect(result).toEqual({} as I_CursoState);
  });
});
