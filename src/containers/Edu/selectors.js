import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the edu state domain
 */

const selectEduDomain = state => state.edu || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Edu
 */

const makeSelectEdu = () =>
  createSelector(
    selectEduDomain,
    substate => substate,
  );

export default makeSelectEdu;
export { selectEduDomain };
