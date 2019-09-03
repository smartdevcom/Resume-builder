/**
 *
 * Finalize
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export function Finalize() {
	return (
		<div>
			<Helmet>
				<title>Finalize</title>
				<meta name='description' content='Description of Finalize' />
			</Helmet>
			<FormattedMessage {...messages.header} />
		</div>
	);
}

Finalize.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default Finalize;
