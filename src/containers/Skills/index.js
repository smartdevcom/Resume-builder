/**
 *
 * Skills
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import MenuAppBar from '../../components/Appbar';
import { skillsStyles } from './styles';
import SkillsChild from '../../components/SkillsChild';

export function Skills() {
	const classes = skillsStyles();

	return (
		<Grid container justify='center' className={classes.main}>
			<Grid item xs={10} md={11}>
				<MenuAppBar />
				<SkillsChild />
			</Grid>
		</Grid>
	);
}

Skills.propTypes = {
	// dispatch: PropTypes.func.0isRequired,
};

export default Skills;
