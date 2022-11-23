import * as fromUsuarios from './usuarios.reducer';
import { selectUsuariosState } from './usuarios.selectors';

describe('Usuarios Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUsuariosState({
      [fromUsuarios.usuariosFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
