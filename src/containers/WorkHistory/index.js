/**
 *
 * WorkHistory
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import MenuAppBar from '../../components/Appbar';
import { workHistoryStyles } from './styles';
import WorkChild from '../../components/WorkChild';

export function WorkHistory() {
	const classes = workHistoryStyles();

	return (
		<Grid container justify='center' className={classes.main}>
			<Grid item xs={10} md={11}>
				<MenuAppBar />
				<WorkChild />
			</Grid>
		</Grid>
	);
}

WorkHistory.propTypes = {
	// dispatch: PropTypes.func.isRequired,
};

export default WorkHistory;
