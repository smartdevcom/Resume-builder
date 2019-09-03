/**
 *
 * Edu
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import MenuAppBar from '../../components/Appbar';
import { Grid } from '@material-ui/core';
import { educationStyles } from './styles';
import EducationChild from '../../components/EducationChild';

export function Edu() {
	const classes = educationStyles();

	return (
		<Grid container justify='center' className={classes.main}>
			<Grid item xs={10} md={11}>
				<MenuAppBar />
				<EducationChild />
			</Grid>
		</Grid>
	);
}

Edu.propTypes = {
	// dispatch: PropTypes.func.isRequired,
};

export default Edu;
