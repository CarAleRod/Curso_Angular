import { reducer, estadoInicial } from './sesion.reducer';

describe('Sesion Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(estadoInicial, action);

      expect(result).toBe(estadoInicial);
    });
  });
});
