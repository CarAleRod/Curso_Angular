import { inscripcionesReducer, estadoInicial } from './inscripciones.reducer';

describe('Inscripciones Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = inscripcionesReducer(estadoInicial, action);

      expect(result).toBe(estadoInicial);
    });
  });
});
