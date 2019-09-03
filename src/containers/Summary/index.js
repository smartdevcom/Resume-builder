/**
 *
 * Summary
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import MenuAppBar from '../../components/Appbar';
import { summaryStyles } from './styles';
import SummaryChild from '../../components/SummaryChild';

export function Summary() {
	const classes = summaryStyles();

	return (
		<Grid container justify='center' className={classes.main}>
			<Grid item xs={10} md={11}>
				<MenuAppBar />
				<SummaryChild />
			</Grid>
		</Grid>
	);
}

Summary.propTypes = {
	// dispatch: PropTypes.func.isRequired,
};

export default Summary;
