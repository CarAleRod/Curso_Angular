import { alumnosReducer, estadoInicial } from './alumnos.reducer';

describe('Alumnos Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = alumnosReducer(estadoInicial, action);

      expect(result).toBe(estadoInicial);
    });
  });
});
