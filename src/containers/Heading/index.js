/**
 *
 * Heading
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import { connect, useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import MenuAppBar from '../../components/Appbar';
import { Grid } from '@material-ui/core';
import { headingStyles } from './styles';
import HeadingChild from '../../components/HeadingChild';

const Heading = () => {
	const classes = headingStyles();
	// const { fetching, dog, onRequestDog, error } = this.props;
	const dispatch = useDispatch();
	const query = useSelector(state => state);
	const { fetching, server_data, onRequestDog, error } = query;
	const handleClick = e => dispatch({ type: 'API_CALL_REQUEST' });
	return (
		<Grid container justify='center' className={classes.main}>
			<Grid item xs={10} md={11}>
				<MenuAppBar />
				<HeadingChild />
			</Grid>
		</Grid>
		// <div className='App'>
		// 	{/* <Hook /> */}
		// 	<header className='App-header'>
		// 		<img src={dog || logo} className='App-logo' alt='logo' />
		// 		<h1 className='App-title'>Welcome to Dog Saga</h1>
		// 	</header>

		// 	{dog ? (
		// 		<p className='App-intro'>Keep clicking for new dogs</p>
		// 	) : (
		// 		<p className='App-intro'>Replace the React icon with a dog!</p>
		// 	)}

		// 	{fetching ? (
		// 		<button disabled>Fetching...</button>
		// 	) : (
		// 		<button onClick={onRequestDog}>Request a Dog</button>
		// 	)}

		// 	{error && <p style={{ color: 'red' }}>Uh oh - something went wrong!</p>}
		// </div>
	);
};

// const mapStateToProps = state => {
// 	return {
// 		fetching: state.fetching,
// 		dog: state.dog,
// 		error: state.error
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onRequestDog: () => dispatch({ type: 'API_CALL_REQUEST' })
// 	};
// };

// export default connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(Heading);

export default Heading;
