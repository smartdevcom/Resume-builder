import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the finalize state domain
 */

const selectFinalizeDomain = state => state.finalize || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Finalize
 */

const makeSelectFinalize = () =>
  createSelector(
    selectFinalizeDomain,
    substate => substate,
  );

export default makeSelectFinalize;
export { selectFinalizeDomain };
