/**
 *
 * SummaryChild
 *
 */

import React, { memo } from 'react';
import { Grid, Box, Typography, Paper, Button } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import CustomInput from '../Input';
import { summaryChildStyles } from './style';
import CustomButton from '../Button';
import { Link } from 'react-router-dom';
import SearchList from '../SearchList/SearchList';

function SummaryChild() {
	const classes = summaryChildStyles();

	const handleSearchItemSelected = item => {
		console.log(item);
	}

	return (
		<Paper className={classes.paper} elevation={0}>
			<Grid container spacing={3}>
				<Grid item md={8}>
					<Grid container spacing={3} className={classes.container}>
						<Grid item xs={12} md={6}>
							<CustomInput label='Summary Details' placeholder='Description' multiline rows={24} />
						</Grid>
						<Grid item xs={12} md={6}>
							<SearchList height={460} onItemSelected={ handleSearchItemSelected } resource='summary-suggestions' ></SearchList>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ marginTop: 32 }}>
						<Grid container justify='space-between'>
							<Grid xs={12} md={2} item>
								<Button component={Link} to='/skills' variant='contained' color='default' fullWidth>
									Back
								</Button>
							</Grid>
							<Grid xs={12} md={2} item>
								<CustomButton component={Link} to='/finalize'>
									Next step
								</CustomButton>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={4}>
					<Box boxShadow={2} borderRadius={4}>
						<img src='https://via.placeholder.com/300x450' className={classes.img} alt='cv' />
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
}

SummaryChild.propTypes = {};

export default memo(SummaryChild);
