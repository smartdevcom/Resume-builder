import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the workHistory state domain
 */

const selectWorkHistoryDomain = state => state.workHistory || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WorkHistory
 */

const makeSelectWorkHistory = () =>
  createSelector(
    selectWorkHistoryDomain,
    substate => substate,
  );

export default makeSelectWorkHistory;
export { selectWorkHistoryDomain };
