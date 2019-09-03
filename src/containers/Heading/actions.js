/*
 *
 * Heading actions
 *
 */

import { DEFAULT_ACTION, GET_DATA } from './constants';

export function defaultAction() {
	return {
		type: DEFAULT_ACTION
	};
}

export const getData = () => ({
	type: GET_DATA
});
