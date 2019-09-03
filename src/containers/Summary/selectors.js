import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the summary state domain
 */

const selectSummaryDomain = state => state.summary || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Summary
 */

const makeSelectSummary = () =>
  createSelector(
    selectSummaryDomain,
    substate => substate,
  );

export default makeSelectSummary;
export { selectSummaryDomain };
