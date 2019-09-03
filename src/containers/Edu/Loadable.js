/**
 *
 * Asynchronously loads the component for Edu
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
