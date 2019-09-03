/**
 *
 * Asynchronously loads the component for WorkChild
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
