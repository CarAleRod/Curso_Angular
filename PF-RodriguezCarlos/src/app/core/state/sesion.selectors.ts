import { createFeatureSelector, createSelector } from '@ngrx/store';
import { I_Sesion } from '../models/sesion';
import * as fromSesion from './sesion.reducer';

export const selectSesionState = createFeatureSelector<I_Sesion>(
  fromSesion.sesionFeatureKey
);

export const selectSesion = createSelector(selectSesionState, (state) => state);
